import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { Modalize } from 'react-native-modalize';
import { MaterialIcons } from '@expo/vector-icons';


const ServiceAreaScreen = () => {
    const [location, setLocation] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [currentPolygon, setCurrentPolygon] = useState([]);
    const [circles, setCircles] = useState([]);
    const [radiusInput, setRadiusInput] = useState('');
    const [mode, setMode] = useState(null);

    // Loading state for switching modes
    const [isModeSwitching, setIsModeSwitching] = useState(false);
    const [mapReady, setMapReady] = useState(false); // ✅ Track map readiness
    const [isSatelliteView, setIsSatelliteView] = useState(false);


    const mapRef = useRef(null);
    const modalizeRef = useRef();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);

            // ✅ Ensure animation only runs when the map is fully loaded
            if (mapReady && mapRef.current) {
                mapRef.current.animateToRegion(
                    {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,  // ✅ Zoom in closely
                        longitudeDelta: 0.005,
                    },
                    1000
                );
            }
        })();
    }, [mapReady]); // ✅ Run animation only after the map is ready

    // Handle switching modes with a brief loading state
    const handleModeSwitch = (newMode) => {
        if (mode === newMode) return; // No need to switch if already in the same mode

        // Check if there are existing polygons or circles before switching
        if (polygons.length > 0 || circles.length > 0) {
            Alert.alert(
                "Switch Mode?",
                `Switching to "${newMode}" mode will remove all saved ${mode === "custom" ? "polygons" : "circles"}. Continue?`,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Yes, Switch",
                        onPress: () => {
                            // Clear existing shapes
                            setPolygons([]);
                            setCurrentPolygon([]);
                            setCircles([]);
                            setMode(newMode); // Switch mode after clearing
                        },
                    },
                ]
            );
        } else {
            setMode(newMode); // If no shapes, switch mode immediately
        }
    };

    // Toggle between satellite and standard map views
    const toggleMapType = () => {
        setIsSatelliteView((prev) => !prev);
    };

    const handleMapLongPress = (e) => {
        if (mode === 'custom') {
            const newCoordinate = e.nativeEvent.coordinate;
            // Use callback form for better concurrency
            setCurrentPolygon((prevPolygon) => [...prevPolygon, newCoordinate]);
        }
    };

    const handleUndo = () => {
        if (currentPolygon.length > 0) {
            setCurrentPolygon((prevPolygon) => prevPolygon.slice(0, -1));
        }
    };

    const handleAddPolygon = () => {
        if (currentPolygon.length < 3) {
            Alert.alert('Minimum 3 points required');
            return;
        }
        setPolygons((prevPolygons) => [
            ...prevPolygons,
            { id: Date.now(), coordinates: currentPolygon },
        ]);
        setCurrentPolygon([]);
    };

    const handleAddCircle = () => {
        const radius = parseInt(radiusInput);
        if (!radius || radius <= 0) {
            Alert.alert('Please enter valid radius in meters');
            return;
        }
        // Single circle only:
        setCircles([
            {
                id: Date.now(),
                center: location,
                radius,
            },
        ]);
        setRadiusInput('');
    };

    const handleSave = () => {
        let saveData = {};

        if (mode === 'custom') {
            saveData = {
                type: 'custom',
                polygonCount: polygons.length,
                polygons: polygons,
            };
        } else if (mode === 'circle') {
            saveData = {
                type: 'circle',
                radius: circles[0]?.radius,
                center: circles[0]?.center,
            };
        }

        console.log('Saved data:', saveData);
        Alert.alert('Service Area Saved', JSON.stringify(saveData, null, 2));
    };

    const calculatePolygonArea = (polygonArray) => {
        if (!Array.isArray(polygonArray) || polygonArray.length < 3) {
            console.log("Invalid polygon: Not enough coordinates");
            return "0 km²";
        }

        const R = 6371e3; // Earth radius in meters

        // Convert degrees to radians
        const points = polygonArray.map(point => ({
            lat: point.latitude * Math.PI / 180,
            lng: point.longitude * Math.PI / 180
        }));

        // Calculate the centroid longitude (average of all longitudes)
        const lambda0 = points.reduce((sum, point) => sum + point.lng, 0) / points.length;

        // Project coordinates using sinusoidal projection
        const projected = points.map(point => {
            const x = R * (point.lng - lambda0) * Math.cos(point.lat);
            const y = R * point.lat;
            return { x, y };
        });

        // Apply the shoelace formula to calculate area
        let area = 0;
        const n = projected.length;
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += projected[i].x * projected[j].y - projected[j].x * projected[i].y;
        }

        const areaInSquareMeters = Math.abs(area) / 2;

        // Convert to square kilometers
        const areaInSquareKilometers = areaInSquareMeters / 1e6; // 1 km² = 1,000,000 m²

        return areaInSquareKilometers.toFixed(2);
    };
    const calculateTotalServiceArea = () => {
        return polygons.reduce((total, polygon) => total + parseFloat(calculatePolygonArea(polygon.coordinates)), 0);
    };

    const calculateCircleArea = (radius) => {
        return (Math.PI * radius * radius).toFixed(2); // Area of a circle in square meters
    };
    const renderBottomSheetContent = () => (
        <View style={styles.sheetContent}>
            <Text style={[styles.heading, { textAlign: 'center' }]}>
                Please Select Your Service Area
            </Text>

            <View style={styles.modeSelector}>
                <TouchableOpacity
                    style={[styles.modeButton, mode === 'custom' && styles.activeMode]}
                    onPress={() => handleModeSwitch('custom')}
                    disabled={isModeSwitching}
                >
                    {isModeSwitching && mode !== 'custom' ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.modeButtonText}>Custom</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.modeButton, mode === 'circle' && styles.activeMode]}
                    onPress={() => handleModeSwitch('circle')}
                    disabled={isModeSwitching}
                >
                    {isModeSwitching && mode !== 'circle' ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.modeButtonText}>Circle</Text>
                    )}
                </TouchableOpacity>
            </View>

            {mode === 'custom' && (
                <>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                currentPolygon.length === 0 && styles.disabledButton,
                            ]}
                            onPress={handleUndo}
                            disabled={currentPolygon.length === 0}
                        >
                            <Text style={styles.buttonText}>Undo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                currentPolygon.length < 3 && styles.disabledButton,
                            ]}
                            onPress={handleAddPolygon}
                            disabled={currentPolygon.length < 3}
                        >
                            <Text style={styles.buttonText}>Add Area</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.polygonsList}>
                        {polygons.map((polygon, index) => {
                            const area = calculatePolygonArea(polygon.coordinates);
                            return (
                                <View key={polygon.id} style={styles.polygonCard}>
                                    <Text style={styles.polygonTitle}>
                                        Area {index + 1}: {area} km²
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() =>
                                            setPolygons((prevPolygons) =>
                                                prevPolygons.filter((p) => p.id !== polygon.id)
                                            )
                                        }
                                    >
                                        <MaterialIcons name="close" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>

                    {/* ✅ Display Total Service Area */}
                    <Text style={styles.totalAreaText}>
                        Total Service Area: {calculateTotalServiceArea()} m²
                    </Text>
                </>
            )}

            {mode === 'circle' && (
                <View style={styles.circleContainer}>
                    <Text style={styles.inputLabel}>Enter radius in meters</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.radiusInput}
                            keyboardType="numeric"
                            value={radiusInput}
                            onChangeText={setRadiusInput}
                            placeholder="e.g., 500"
                        />
                        <TouchableOpacity style={styles.applyButton} onPress={handleAddCircle}>
                            <Text style={styles.buttonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    {circles.map((circle) => (
                        <View key={circle.id} style={styles.circleCard}>
                            <Text style={styles.circleText}>
                                Radius: {circle.radius}m, Area: {calculateCircleArea(circle.radius)} m²
                            </Text>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => setCircles([])}
                            >
                                <MaterialIcons name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={[styles.saveButton, !mode && styles.disabledButton]}
                onPress={handleSave}
                disabled={!mode}
            >
                <Text style={styles.saveButtonText}>Save Configuration</Text>
            </TouchableOpacity>
        </View>
    );

    // Show a loader if location is not yet available
    if (!location) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Loading map...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 0, // **Show the whole world initially**
                    longitude: 0,
                    latitudeDelta: 100,  // **Covers the whole globe**
                    longitudeDelta: 100,
                }}
                mapType={isSatelliteView ? 'satellite' : 'standard'} // Set map type based on state
                onMapReady={() => setMapReady(true)} // ✅ Ensure map is fully ready before animation
                onLongPress={handleMapLongPress}
            >
                {/* Show current location with "my-location" icon */}
                {location && (
                    <Marker coordinate={location} title="You are here">
                        <MaterialIcons name="my-location" size={25} color="#1733E3" />
                    </Marker>
                )}

                {/* Existing Polygons */}
                {polygons.map((polygon) => (
                    <React.Fragment key={polygon.id}>
                        <Polygon
                            coordinates={polygon.coordinates}
                            fillColor="rgba(0,128,255,0.3)"
                            strokeColor="rgba(0,128,255,0.8)"
                            strokeWidth={2}
                        />
                        {polygon.coordinates.map((coord, idx) => (
                            <Marker
                                key={`polygonMarker-${polygon.id}-${idx}`}
                                coordinate={coord}
                                pinColor="blue"
                            />
                        ))}
                    </React.Fragment>
                ))}

                {/* Current Polygon (in progress) */}
                {currentPolygon.length >= 2 && (
                    <Polygon
                        coordinates={currentPolygon}
                        fillColor="rgba(255,0,0,0.3)"
                        strokeColor="rgba(255,0,0,0.8)"
                        strokeWidth={2}
                    />
                )}

                {/* Markers for each vertex in current (in-progress) polygon */}
                {currentPolygon.map((coord, index) => (
                    <Marker
                        key={`currentMarker-${index}`}
                        coordinate={coord}
                        pinColor="red"
                    />
                ))}

                {/* Circles */}
                {circles.map((circle) => (
                    <Circle
                        key={circle.id}
                        center={circle.center}
                        radius={circle.radius}
                        fillColor="rgba(0,200,0,0.3)"
                        strokeColor="rgba(0,150,0,0.8)"
                        strokeWidth={2}
                    />
                ))}
            </MapView>

            <TouchableOpacity style={styles.toggleButton} onPress={toggleMapType}>
                <Text style={styles.toggleButtonText}>
                    {isSatelliteView ? 'Standard View' : 'Satellite View'}
                </Text>
            </TouchableOpacity>

            <Modalize
                ref={modalizeRef}
                alwaysOpen={200}
                handlePosition="inside"
                modalStyle={styles.modal}
                adjustToContentHeight
                childrenStyle={{ height: 370 }}
            /* This is the important part: */

            >
                {renderBottomSheetContent()}
            </Modalize>

        </View>
    );
};

export default ServiceAreaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toggleButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 3,
    },
    toggleButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
    },
    modal: {
        backgroundColor: '#f9f9f9',
    },
    sheetContent: {
        padding: 16,
    },
    heading: {
        fontSize: 20, // 🔹 Make it a proper heading size
        fontWeight: 'bold', // 🔹 Make it bold
        color: '#020517', // 🔹 Use a secondary color (adjust as needed)
        paddingVertical: 10, // 🔹 Add vertical padding for better spacing
    },

    modeSelector: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    modeButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#888',
        margin: 4,
        borderRadius: 4,
        alignItems: 'center',
    },
    activeMode: {
        backgroundColor: '#007BFF',
    },
    modeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },
    actionButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 4,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
    },
    polygonsList: {
        marginTop: 10,
    },
    polygonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 8,
        marginVertical: 4,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    totalAreaText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        color: '#333',
    },
    polygonTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
    },
    circleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
    },

    removeButton: {
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 3,
    },
    circleContainer: {
        marginTop: 8,
    },
    inputLabel: {
        marginBottom: 4,
        fontWeight: '600',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radiusInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginRight: 8,
        borderRadius: 4,
    },
    applyButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 4,
    },
    circleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 8,
        marginVertical: 4,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    circleText: {
        fontSize: 14,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
