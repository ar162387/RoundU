import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import InputField from '../../components/inputfield';
import Dropdown from '../../components/Dropdown';
import { RadioButton } from 'react-native-paper';
import Button from '../../components/button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CreateShopForm = ({ navigation, onSubmit }) => {
    const [shopName, setShopName] = useState('');
    const [shopDescription, setShopDescription] = useState('');
    const [shopType, setShopType] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [shopLocation, setShopLocation] = useState('Mobile');
    const [deliveryPreference, setDeliveryPreference] = useState('');
    const [categories, setCategories] = useState([]); // Placeholder for dynamic categories
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        console.log('Opening image picker...'); // Log 1: Check if the function is triggered
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Updated to use MediaType
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log('Image picker result:', result); // Log 2: Check the result object

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0]; // Access the first item in the assets array
            console.log('Image selected. URI:', selectedImage.uri); // Log 3: Check the URI of the selected image
            setImage(selectedImage.uri);
        } else {
            console.log('Image selection cancelled.'); // Log 4: Check if the user cancelled the selection
        }
    };

    // Dynamically update delivery options based on shop type
    const getDeliveryOptions = () => {
        if (shopType === 'Services') {
            return ['Home-service', 'On-site', 'Both'];
        }
        return ['Delivery', 'Pick-up', 'Both'];
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Header */}
            {/* <Text style={styles.header}>Create Shop</Text> */}
            <Text style={styles.subHeading}>
                Please Spare some time to create your shop
            </Text>

            {/* Image Upload Field */}
            <View style={styles.imageUploadContainer}>
                <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.imagePreview} />
                    ) : (
                        <Text style={styles.plusSign}>+</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Shop Name */}
            <InputField
                label="Shop Name"
                value={shopName}
                onChangeText={setShopName}
            />

            {/* Shop Description */}
            <InputField
                label="Shop Description"
                value={shopDescription}
                onChangeText={setShopDescription}
                isPassword={false}
            />

            {/* Shop Type Dropdown */}
            <Dropdown
                label="Shop Type"
                options={['Canteen', 'General Store', 'Women Saloon', 'Men Saloon', 'Bakery',
                    'Hardware', 'Accessories', 'Electronics', 'Repair', 'Clothes', 'Cafeteria', 'Restaurant']}
                selectedValue={shopType}
                onValueChange={(value) => {
                    setShopType(value);
                    setCategories([]); // Update categories dynamically
                }}
            />

            {/* Shop Address */}
            <InputField
                label="Shop Address"
                value={shopAddress}
                onChangeText={setShopAddress}
            />

            {/* Shop Location Radio Buttons */}
            <View style={styles.radioGroupContainer}>
                <Text style={styles.label}>Shop Location</Text>
                <View style={styles.radioGroup}>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="Mobile"
                            status={shopLocation === 'Mobile' ? 'checked' : 'unchecked'}
                            onPress={() => setShopLocation('Mobile')}
                            color="#1733E3"
                        />
                        <Text>Mobile</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="Fixed"
                            status={shopLocation === 'Fixed' ? 'checked' : 'unchecked'}
                            onPress={() => setShopLocation('Fixed')}
                            color="#1733E3"
                        />
                        <Text>Fixed</Text>
                    </View>
                </View>
            </View>

            {/* Delivery Preference Dropdown */}
            <Dropdown
                label="Delivery Preference"
                options={getDeliveryOptions()}
                selectedValue={deliveryPreference}
                onValueChange={setDeliveryPreference}
            />



            {/* Submit Button */}
            <Button
                title="Submit"
                onPress={() => { navigation.navigate('ServiceArea') }
                }
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#020517',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 14,
        color: '#4C5066',
        textAlign: 'center',
        marginBottom: 20,
    },
    imageUploadContainer: {
        marginBottom: 16,
        alignItems: 'center',
    },
    imageUploadBox: {
        width: 100,
        height: 100,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#1733E3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F5',
    },
    plusSign: {
        fontSize: 24,
        color: '#1733E3',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    radioGroupContainer: {
        marginBottom: 16,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    label: {
        fontSize: 14,
        color: '#4C5066',
        marginBottom: 8,
    },
    placeholder: {
        fontSize: 12,
        color: '#4C5066',
        fontStyle: 'italic',
        marginBottom: 20,
    },
});

export default CreateShopForm;