import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import ActionComponent from "../../components/ActionComponent"; // Import the updated component
import CategoryItem from "../../components/CategoryItem"; // Import the new component
import ItemComponent from "../../components/ItemComponent";
import ServiceItem from "../../components/ServiceItem";
import RentalItem from "../../components/RentalItem";

const ShopScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");



    const categoryData = [
        { id: 1, name: "Beverages & Confectionary", imageUrl: "https://media.istockphoto.com/id/847321716/fi/valokuva/makrokuva-tietokoneen-n%C3%A4yt%C3%B6st%C3%A4-jossa-on-http-osoiterivi-ja-selain.jpg?s=612x612&w=0&k=20&c=5inyAJ2_xHlOhQ4f3tik7Mc4Nr3JT-tD5g8sF-s_UCc=" },
        { id: 2, name: "Snacks", imageUrl: "https://via.placeholder.com/60" },
        { id: 3, name: "Food & vegetables", imageUrl: "https://via.placeholder.com/60" },
        { id: 4, name: "Bakery", imageUrl: "https://via.placeholder.com/60" },
    ];
    const [filteredCategories, setFilteredCategories] = useState(categoryData);





    const [showItemSearch, setShowItemSearch] = useState(false);
    const [itemSearchText, setItemSearchText] = useState("");
    const [itemsData, setItemsData] = useState([
        { id: 1, name: "Milk Pack", price: "120", imageUrl: "https://via.placeholder.com/150", available: true },
        { id: 2, name: "Eggs (12 Pack)", price: "220", imageUrl: "https://via.placeholder.com/150", available: true },
        { id: 3, name: "Bread", price: "80", imageUrl: "https://via.placeholder.com/150", available: false },
    ]);

    const [filteredItems, setFilteredItems] = useState(itemsData);

    const toggleItemAvailability = (id) => {
        setItemsData((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, available: !item.available } : item
            )
        );
    };


    // Function to filter categories
    const handleCategorySearch = (text) => {
        setSearchText(text);
        if (text.trim() === "") {
            setFilteredCategories(categoryData);
        } else {
            setFilteredCategories(
                categoryData.filter((category) =>
                    category.name.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    // Function to filter items
    const handleItemSearch = (text) => {
        setItemSearchText(text);
        if (text.trim() === "") {
            setFilteredItems(itemsData);
        } else {
            setFilteredItems(
                itemsData.filter((item) =>
                    item.name.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };


    const [showServiceSearch, setShowServiceSearch] = useState(false);
    const [serviceSearchText, setServiceSearchText] = useState("");

    const [servicesData, setServicesData] = useState([
        { id: 1, name: "Car Repair", price: "1500", imageUrl: "https://via.placeholder.com/100", active: true },
        { id: 2, name: "Home Cleaning", price: "1200", imageUrl: "https://via.placeholder.com/100", active: false },
    ]);

    const [filteredServices, setFilteredServices] = useState(servicesData);

    const handleServiceSearch = (text) => {
        setServiceSearchText(text);
        if (text.trim() === "") {
            setFilteredServices(servicesData);
        } else {
            setFilteredServices(
                servicesData.filter((service) =>
                    service.name.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    const toggleServiceStatus = (id) => {
        setServicesData((prevServices) =>
            prevServices.map((service) =>
                service.id === id ? { ...service, active: !service.active } : service
            )
        );
    };

    const [showRentalSearch, setShowRentalSearch] = useState(false);
    const [rentalSearchText, setRentalSearchText] = useState("");

    const [rentalsData, setRentalsData] = useState([
        { id: 1, name: "Bike Rental", price: "500", imageUrl: "https://via.placeholder.com/100", active: true },
        { id: 2, name: "Camera Rental", price: "1200", imageUrl: "https://via.placeholder.com/100", active: false },
    ]);

    const [filteredRentals, setFilteredRentals] = useState(rentalsData);

    const handleRentalSearch = (text) => {
        setRentalSearchText(text);
        if (text.trim() === "") {
            setFilteredRentals(rentalsData);
        } else {
            setFilteredRentals(
                rentalsData.filter((rental) =>
                    rental.name.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    const toggleRentalStatus = (id) => {
        setRentalsData((prevRentals) =>
            prevRentals.map((rental) =>
                rental.id === id ? { ...rental, active: !rental.active } : rental
            )
        );
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                style={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <View style={styles.textContainer}>
                            <Text style={styles.shopName}>My Shop</Text>
                            <View style={styles.ratingContainer}>
                                <FontAwesome5 name="star" size={16} color="#FFD700" />
                                <Text style={styles.rating}>5.0 (400)</Text>
                            </View>
                        </View>

                        {/* Right Section: Shop Image */}
                        <Image
                            source={{ uri: "https://via.placeholder.com/100" }}
                            style={styles.shopImage}
                        />
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtonRow}>
                        <ActionComponent
                            title="Delivery Option"
                            iconLibrary="FontAwesome5"
                            iconName="truck"
                            width={180}
                            height={45}
                            roundCorners={8}
                            gradientColors={["#11998E", "#38EF7D"]}
                            onPress={() => console.log("Delivery Option Clicked")}
                        />
                        <ActionComponent
                            title="Edit Shop"
                            iconLibrary="FontAwesome5"
                            iconName="edit"
                            width={140}
                            height={45}
                            roundCorners={8}
                            gradientColors={["#36D1DC", "#5B86E5"]}
                            onPress={() => console.log("Edit Shop Clicked")}
                        />
                    </View>

                    {/* Set Service Area Button */}
                    <View style={styles.fullWidthButtonContainer}>
                        <ActionComponent
                            title="Set Service Area"
                            iconLibrary="FontAwesome5"
                            iconName="map-marked-alt"
                            width={330}
                            height={45}
                            roundCorners={8}
                            onPress={() => console.log("Set Service Area Clicked")}
                        />
                    </View>

                    {/* Separator */}
                    <View style={styles.separator} />

                    {/* Categories Header with Search & Add Icons */}
                    <View style={styles.categoriesHeader}>
                        <Text style={styles.categoriesLabel}>Categories</Text>

                        {showSearch ? (
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchBar}
                                    placeholder="Search Categories..."
                                    value={searchText}
                                    onChangeText={handleCategorySearch} // Apply search function
                                    autoFocus
                                />
                                {/* Reset/Clear Icon */}
                                {searchText.length > 0 ? (
                                    <TouchableOpacity onPress={() => {
                                        setSearchText("");
                                        setFilteredCategories(categoryData); // Reset list
                                        setShowSearch(false);
                                    }}>
                                        <FontAwesome5 name="times-circle" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setShowSearch(false)}>
                                        <FontAwesome5 name="times" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity onPress={() => setShowSearch(true)} style={{ marginRight: 5 }}>
                                    <FontAwesome5 name="search" size={18} color="#020517" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log("Add Category Clicked")}>
                                    <FontAwesome5 name="plus" size={18} color="#020517" style={{ marginLeft: 12 }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>


                    {/* Horizontally Scrollable Category List */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
                        {filteredCategories.map((category) => (
                            <CategoryItem
                                key={category.id}
                                categoryName={category.name}
                                imageUrl={category.imageUrl}
                                itemCount={0}
                                isSelected={selectedCategory === category.id}
                                onSelect={() => setSelectedCategory(category.id)}
                            />
                        ))}
                    </ScrollView>


                    {/* Separator for Items */}
                    <View style={styles.separator} />

                    {/* Items Header with Search & Add Icons */}
                    <View style={styles.itemsHeader}>
                        <Text style={styles.itemsLabel}>Items</Text>

                        {showItemSearch ? (
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchBar}
                                    placeholder="Search Items..."
                                    value={itemSearchText}
                                    onChangeText={handleItemSearch} // Apply search function
                                    autoFocus
                                />
                                {/* Reset/Clear Icon */}
                                {itemSearchText.length > 0 ? (
                                    <TouchableOpacity onPress={() => {
                                        setItemSearchText("");
                                        setFilteredItems(itemsData); // Reset list
                                        setShowItemSearch(false);
                                    }}>
                                        <FontAwesome5 name="times-circle" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setShowItemSearch(false)}>
                                        <FontAwesome5 name="times" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity onPress={() => setShowItemSearch(true)}>
                                    <FontAwesome5 name="search" size={18} color="#020517" style={{ marginRight: 5 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log("Add Item Clicked")}>
                                    <FontAwesome5 name="plus" size={18} color="#020517" style={{ marginLeft: 12 }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>


                    {/* Horizontally Scrollable Item List */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemList}>
                        {filteredItems.map((item) => (
                            <ItemComponent
                                key={item.id}
                                itemName={item.name}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                available={item.available}
                                onToggle={() => toggleItemAvailability(item.id)}
                            />
                        ))}
                    </ScrollView>



                    {/* Separator for Services */}
                    <View style={styles.separator} />


                    {/* Services Header with Search & Add Icons */}

                    <View style={styles.servicesHeader}>
                        <Text style={styles.servicesLabel}>Services</Text>

                        {showServiceSearch ? (
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchBar}
                                    placeholder="Search Services..."
                                    value={serviceSearchText}
                                    onChangeText={handleServiceSearch} // Apply search function
                                    autoFocus
                                />
                                {/* Reset/Clear Icon */}
                                {serviceSearchText.length > 0 ? (
                                    <TouchableOpacity onPress={() => {
                                        setServiceSearchText("");
                                        setFilteredServices(servicesData); // Reset list
                                        setShowServiceSearch(false);
                                    }}>
                                        <FontAwesome5 name="times-circle" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setShowServiceSearch(false)}>
                                        <FontAwesome5 name="times" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity onPress={() => setShowServiceSearch(true)} style={{ marginRight: 5 }}>
                                    <FontAwesome5 name="search" size={18} color="#020517" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log("Add Service Clicked")}>
                                    <FontAwesome5 name="plus" size={18} color="#020517" style={{ marginLeft: 12 }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Scrollable Services List */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceList}>
                        {filteredServices.map((service) => (
                            <ServiceItem
                                key={service.id}
                                serviceName={service.name}
                                imageUrl={service.imageUrl}
                                price={service.price}
                                isActive={service.active}
                                onToggle={() => toggleServiceStatus(service.id)}
                            />
                        ))}
                    </ScrollView>


                    {/* Rentals Header with Search & Add Icons */}

                    <View style={styles.separator} />

                    <View style={styles.rentalsHeader}>
                        <Text style={styles.rentalsLabel}>Rentals</Text>

                        {showRentalSearch ? (
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchBar}
                                    placeholder="Search Rentals..."
                                    value={rentalSearchText}
                                    onChangeText={handleRentalSearch}
                                    autoFocus
                                />
                                {/* Reset/Clear Icon */}
                                {rentalSearchText.length > 0 ? (
                                    <TouchableOpacity onPress={() => {
                                        setRentalSearchText("");
                                        setFilteredRentals(rentalsData);
                                        setShowRentalSearch(false);
                                    }}>
                                        <FontAwesome5 name="times-circle" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setShowRentalSearch(false)}>
                                        <FontAwesome5 name="times" size={18} color="#020517" style={styles.resetIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity onPress={() => setShowRentalSearch(true)} style={{ marginRight: 5 }}>
                                    <FontAwesome5 name="search" size={18} color="#020517" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log("Add Rental Clicked")}>
                                    <FontAwesome5 name="plus" size={18} color="#020517" style={{ marginLeft: 12 }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Scrollable Rentals List */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rentalList}>
                        {filteredRentals.map((rental) => (
                            <RentalItem
                                key={rental.id}
                                rentalName={rental.name}
                                imageUrl={rental.imageUrl}
                                price={rental.price}
                                isActive={rental.active}
                                onToggle={() => toggleRentalStatus(rental.id)}
                            />
                        ))}
                    </ScrollView>




                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );

};

/* Styles */
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flexGrow: 1,
        backgroundColor: "white",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#F1F3F6",
        borderRadius: 10,
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "center",
    },
    shopName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#020517",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    rating: {
        fontSize: 14,
        color: "#4C5066",
        marginLeft: 4,
    },
    shopImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#EAEAEA",
    },
    actionButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 10,
    },
    fullWidthButtonContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    separator: {
        height: 1,
        backgroundColor: "#EAEAEA",
        marginVertical: 16,
    },
    categoriesHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        // paddingTop: 5
    },
    categoriesLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#020517",
        paddingVertical: 5
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 8
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F3F6",
        borderRadius: 8,
        paddingHorizontal: 10,
        flex: 1,
        marginLeft: 10
    },
    searchBar: {
        flex: 1,
        height: 40,
        width: 1,
        fontSize: 14,
        color: "#020517",
    },
    resetIcon: {
        marginLeft: 8,
    },
    categoryList: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 8
    },

    itemsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        // marginTop: 16,
    },
    itemsLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#020517",
    },
    itemList: {
        marginTop: 10,
        paddingHorizontal: 10,
    },

    servicesHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        // marginTop: 16,
    },
    servicesLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#020517",
    },
    serviceList: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    rentalsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 16,
    },
    rentalsLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#020517",
    },
    rentalList: {
        marginTop: 10,
        paddingHorizontal: 10,
    },


});

export default ShopScreen;