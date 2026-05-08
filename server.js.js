const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= MENU =================

let menu = [

  // MOCKTAILS
  { id: 1, name: "Balaji Camel (Blue Lagoon)", price: 160 },
  { id: 2, name: "Virgin Mojito", price: 160 },
  { id: 3, name: "Lemon Iced Tea", price: 160 },
  { id: 4, name: "Litchi Lagoon", price: 160 },
  { id: 5, name: "Purple Passion", price: 160 },
  { id: 6, name: "Ginger Lime Spritzer", price: 160 },
  { id: 7, name: "Orange Blossom", price: 180 },
  { id: 8, name: "Aam Panna", price: 180 },
  { id: 9, name: "Cranberry Smash", price: 180 },
  { id: 10, name: "Blue Moon", price: 180 },
  { id: 11, name: "Kiwi Delight", price: 180 },
  { id: 12, name: "Virgin Pina Colada", price: 190 },
  { id: 13, name: "Cookie Cutter", price: 200 },
  { id: 14, name: "Chocomoco", price: 200 },
  { id: 15, name: "Balaji Special Fruit Punch", price: 200 },

  // APPETIZERS
  { id: 16, name: "Papad Fry", price: 30 },
  { id: 17, name: "Papad Roasted", price: 25 },
  { id: 18, name: "Masala Papad", price: 50 },
  { id: 19, name: "Raja Special", price: 70 },
  { id: 20, name: "French Fries", price: 130 },
  { id: 21, name: "French Cheese Fries", price: 150 },
  { id: 22, name: "Cheese Cherry Pineapple", price: 160 },

  // SALAD
  { id: 23, name: "Fresh Cucumber Salad Half", price: 40 },
  { id: 24, name: "Fresh Cucumber Salad Full", price: 70 },
  { id: 25, name: "Fresh Green Salad Half", price: 60 },
  { id: 26, name: "Fresh Green Salad Full", price: 100 },
  { id: 27, name: "Aloo Chatpat", price: 120 },
  { id: 28, name: "Mexican Salad", price: 170 },
  { id: 29, name: "Russian Salad", price: 170 },
  { id: 30, name: "Egg Salad", price: 150 },
  { id: 31, name: "Tandoori Chicken Salad", price: 200 },

  // RAITA
  { id: 32, name: "Mix Veg Raita", price: 110 },
  { id: 33, name: "Boondi Raita", price: 110 },
  { id: 34, name: "Pineapple Raita", price: 130 },
  { id: 35, name: "Plain Curd", price: 60 },

  // VEG STARTERS
  { id: 36, name: "Mix Veg Pakoda", price: 130 },
  { id: 37, name: "Onion Pakoda / Bhajia", price: 130 },
  { id: 38, name: "Veg Boiled", price: 150 },
  { id: 39, name: "Green Peas Dry", price: 160 },
  { id: 40, name: "Garlic Fry", price: 160 },
  { id: 41, name: "Corn Pepper Dry", price: 180 },
  { id: 42, name: "Hara Bhara Kebab", price: 190 },
  { id: 43, name: "Corn Tikki", price: 210 },
  { id: 44, name: "Paneer Pakoda", price: 220 },
  { id: 45, name: "Cheese Pakoda", price: 240 },

  // EGG DISHES
  { id: 46, name: "Boiled Egg", price: 40 },
  { id: 47, name: "Egg Half Fry", price: 60 },
  { id: 48, name: "Egg Omelette", price: 80 },
  { id: 49, name: "Egg Bhurji", price: 100 },
  { id: 50, name: "Egg Pakoda", price: 120 },
  { id: 51, name: "Egg Pepper Dry", price: 150 },
  { id: 52, name: "Egg Urval", price: 160 },
  { id: 53, name: "Egg Ghee Roast", price: 190 },

  // VEG SOUPS
  { id: 54, name: "Veg Clear Soup", price: 90 },
  { id: 55, name: "Veg Manchow / Hot & Sour Soup", price: 100 },
  { id: 56, name: "Cream Of Palak Soup", price: 110 },
  { id: 57, name: "Cream Of Veg Soup", price: 120 },
  { id: 58, name: "Lemon Coriander Soup", price: 120 },
  { id: 59, name: "Burnt Garlic Veg Soup", price: 120 },
  { id: 60, name: "Sweet Corn Veg Soup", price: 120 },
  { id: 61, name: "Cream Of Tomato Soup", price: 120 },
  { id: 62, name: "Cream Of Mushroom Soup", price: 130 },
  { id: 63, name: "Veg Noodle Soup", price: 130 },
  { id: 64, name: "Veg Wonton Soup", price: 130 },
  { id: 65, name: "Tom Yum Soup", price: 150 },

  // NON VEG SOUPS
  { id: 66, name: "Chicken Clear Soup", price: 110 },
  { id: 67, name: "Chicken Manchow / Hot & Sour Soup", price: 120 },
  { id: 68, name: "Chicken Shorba Soup", price: 130 },
  { id: 69, name: "Cream Of Chicken Soup", price: 140 },
  { id: 70, name: "Sweet Corn Chicken Soup", price: 140 },
  { id: 71, name: "Lemon Coriander Chicken Soup", price: 140 },
  { id: 72, name: "Burnt Garlic Chicken Soup", price: 140 },
  { id: 73, name: "Lung Fung Chicken Soup", price: 150 },
  { id: 74, name: "Tom Yum Chicken Soup", price: 170 },
  { id: 75, name: "Mutton Clear Soup", price: 130 },
  { id: 76, name: "Mutton Manchow / Hot & Sour Soup", price: 150 },
  { id: 77, name: "Sea Food Soup", price: 170 },

  // SOUTH INDIAN STARTERS
  { id: 78, name: "Chicken Sukka Half", price: 130 },
  { id: 79, name: "Chicken Sukka Full", price: 250 },
  { id: 80, name: "Chicken Oil Kabab Half", price: 150 },
  { id: 81, name: "Chicken Oil Kabab Full", price: 280 },
  { id: 82, name: "Chicken Pepper Dry", price: 260 },
  { id: 83, name: "Chicken Uppumunchi", price: 260 },
  { id: 84, name: "Chicken 65", price: 260 },
  { id: 85, name: "Chicken Koliwada", price: 280 },
  { id: 86, name: "Chicken Kadi Patta", price: 280 },
  { id: 87, name: "Chicken Urval", price: 280 },
  { id: 88, name: "Chicken Tawa Fry", price: 320 },
  { id: 89, name: "Chicken Ghee Roast", price: 350 },
  { id: 90, name: "Chicken Andra Chilli", price: 300 },

  // FISH FOOD
  { id: 91, name: "Pomfret Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 92, name: "Kingfish (Anjali) Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 93, name: "Bangda Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 94, name: "Silver Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 95, name: "Bondas Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 96, name: "Prawns Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 97, name: "Bhuthai Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 98, name: "Muru Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },
  { id: 99, name: "Kane (Ladyfish) Fish Tawa Fry / Gravy Fry / Masala Fry", price: null },

  // SOUTH INDIAN MAIN COURSE
  { id: 100, name: "Kori Rotti", price: 200 },
  { id: 101, name: "Chicken Curry Neer Dosa", price: 180 },
  { id: 102, name: "Chicken Kundapura", price: 180 },
  { id: 103, name: "Chicken Mangalorean Curry", price: 160 },
  { id: 104, name: "Chicken Pulimunchi", price: 180 },
  { id: 105, name: "Chicken Gassi", price: 180 },
  { id: 106, name: "Chicken Malabar Curry", price: 200 },
  { id: 107, name: "Fish Gassi / Curry", price: null },
  { id: 108, name: "Fish Pulimunchi", price: null },
  { id: 109, name: "Veg Malabar Curry", price: 160 },
  { id: 110, name: "Neer Dosa (Plt 3 Pcs)", price: 60 },
  { id: 111, name: "Rice Rotti", price: 60 },

  // TANDOORI STARTER (VEG)
  { id: 112, name: "Aloo Tikka / Gobi Tikka", price: 190 },
  { id: 113, name: "Baby Corn / Mushroom Tikka", price: 230 },
  { id: 114, name: "Tandoori Watermelon / Pineapple", price: 210 },
  { id: 115, name: "Veg Seekh Kebab", price: 230 },
  { id: 116, name: "Mix Veg Tikka", price: 230 },
  { id: 117, name: "Paneer Tikka", price: 280 },
  { id: 118, name: "Paneer Golden Tikka", price: 280 },
  { id: 119, name: "Paneer Banjara Tikka", price: 280 },
  { id: 120, name: "Paneer Pahadi Tikka", price: 280 },
  { id: 121, name: "Paneer Malai Tikka", price: 280 },
  { id: 122, name: "Paneer Hariyali Tikka", price: 280 },
  { id: 123, name: "Paneer Reshmi Tikka", price: 300 },
  { id: 124, name: "Paneer Hilltop", price: 320 },
  { id: 125, name: "Veg Tandoori Platter", price: 450 },

  // TANDOORI STARTER (NON VEG)
  { id: 126, name: "Chicken Tikka", price: 280 },
  { id: 127, name: "Chicken Chatpata Tikka", price: 280 },
  { id: 128, name: "Chicken Shashlik Kebab", price: 280 },
  { id: 129, name: "Chicken Peri Peri Tikka", price: 280 },
  { id: 130, name: "Chicken Ajwani Kebab", price: 280 },
  { id: 131, name: "Chicken Malai Juicy Kebab", price: 280 },
  { id: 132, name: "Tandoori Lollypop", price: 280 },
  { id: 133, name: "Chicken Seekh Kebab", price: 290 },
  { id: 134, name: "Chicken Sholay Kebab / Kalamiri Kebab", price: 290 },
  { id: 135, name: "Chicken Reshmi Kebab", price: 300 },
  { id: 136, name: "Chicken Chillimilli Kebab", price: 320 },
  { id: 137, name: "Chicken Cheese Garlic Kebab", price: 320 },
  { id: 138, name: "Chicken Irani Tikka", price: 320 },
  { id: 139, name: "Chicken Sonali Tikka", price: 350 },
  { id: 140, name: "Chicken Rozali Tikka (6 Pcs)", price: 360 },
  { id: 141, name: "Chicken Kalmi Kebab (1 Pcs / 2 Pcs)", price: 200 },
  { id: 142, name: "Chicken Tangdi Kebab (1 Pcs / 2 Pcs)", price: 170 },
  { id: 143, name: "Tandoori Chicken Kebab (Half / Full)", price: 320 },
  { id: 144, name: "Chicken Alishan Kebab (2 Pcs / 4 Pcs)", price: 400 },
  { id: 145, name: "Chicken Tandoori (Half / Full)", price: 480 },
  { id: 146, name: "Chicken Peshawari Tandoori (Half / Full)", price: 500 },
  { id: 147, name: "Chicken Juicy Tandoori (Half / Full)", price: 560 },
  { id: 148, name: "Chicken Jahangir Tandoori (Half / Full)", price: 560 },
  { id: 149, name: "Tandoori Chicken Platter", price: 950 },

  // CHINESE STARTER (VEG)
  { id: 150, name: "Chinese Bhel", price: 150 },
  { id: 151, name: "Veg Manchurian / Chilli", price: 180 },
  { id: 152, name: "Crispy Potato", price: 180 },
  { id: 153, name: "Honey Chilli Potato", price: 190 },
  { id: 154, name: "Veg 65 / Veg Crispy", price: 180 },
  { id: 155, name: "Gobi Chilli / Manchurian / Pepper", price: 180 },
  { id: 156, name: "Mushroom Chilli / Manchurian / Pepper", price: 190 },
  { id: 157, name: "Baby Corn Chilli / Manchurian / Pepper", price: 190 },
  { id: 158, name: "Mushroom / Baby Corn 65", price: 200 },
  { id: 159, name: "Baby Corn / Mushroom Butter Garlic", price: 220 },
  { id: 160, name: "Veg Lollypop", price: 200 },
  { id: 161, name: "Veg Spring Roll", price: 220 },
  { id: 162, name: "Paneer Chilli / Manchurian / Pepper", price: 240 },
  { id: 163, name: "Paneer Schezwan Dry", price: 240 },
  { id: 164, name: "Paneer 65", price: 240 },
  { id: 165, name: "Paneer Dragon", price: 250 },
  { id: 166, name: "Paneer Butter Garlic", price: 270 },
  { id: 167, name: "Paneer Satay", price: 290 },
  { id: 168, name: "Veg Chinese Platter", price: 450 },

  // CHINESE STARTER (NON VEG)
  { id: 169, name: "Chicken Lollypop", price: 280 },
  { id: 170, name: "Chicken Chilli / Manchurian / Pepper", price: 250 },
  { id: 171, name: "Lemon Chicken", price: 250 },
  { id: 172, name: "Chicken Crispy", price: 270 },
  { id: 173, name: "Chicken 65", price: 270 },
  { id: 174, name: "Honey Chilli Chicken", price: 270 },
  { id: 175, name: "Chicken Schezwan", price: 270 },
  { id: 176, name: "Guntur Chilli Chicken", price: 280 },
  { id: 177, name: "Kung Pao Chicken", price: 280 },
  { id: 178, name: "Chicken Oyster Chilli", price: 290 },
  { id: 179, name: "Drums Of Heaven", price: 290 },
  { id: 180, name: "Chicken Finger", price: 290 },
  { id: 181, name: "Chicken Spring Roll", price: 290 },
  { id: 182, name: "Dragon Chicken", price: 290 },
  { id: 183, name: "Chicken Butter Garlic", price: 300 },
  { id: 184, name: "Chicken Jungly", price: 320 },
  { id: 185, name: "Chicken Satay", price: 320 },
  { id: 186, name: "Chicken Apple", price: 350 },
  { id: 187, name: "Mutton Chilli / Manchurian / Pepper", price: 430 },
  { id: 188, name: "Mutton 65", price: 450 },
  { id: 189, name: "Mutton Jungly", price: 460 },
  { id: 190, name: "Prawns Chilli / Manchurian / Pepper", price: null },
  { id: 191, name: "Prawns Butter Garlic", price: null },
  { id: 192, name: "Prawns Golden Fry", price: null },
  { id: 193, name: "Prawns 65", price: null },
  { id: 194, name: "Bondas Chilli / Manchurian / Pepper", price: null },
  { id: 195, name: "Bondas 65 / Butter Garlic", price: null },
  { id: 196, name: "Chinese Non Veg Platter", price: 550 },

  // CHINESE RICE (VEG)
  { id: 197, name: "Veg Fried Rice", price: 180 },
  { id: 198, name: "Veg American Chopsuey", price: 180 },
  { id: 199, name: "Veg Schezwan Fried Rice", price: 190 },
  { id: 200, name: "Veg Burnt Garlic Fried Rice", price: 200 },
  { id: 201, name: "Mix Veg Fried Rice", price: 190 },
  { id: 202, name: "Mushroom Fried Rice", price: 200 },
  { id: 203, name: "Veg Singapore Fried Rice", price: 200 },
  { id: 204, name: "Veg Hong Kong Fried Rice", price: 200 },
  { id: 205, name: "Paneer Fried Rice", price: 220 },
  { id: 206, name: "Veg Manchurian Fried Rice", price: 240 },
  { id: 207, name: "Veg Tripple Schezwan Fried Rice", price: 250 },

  // CHINESE RICE (NON VEG)
  { id: 208, name: "Chicken Fried Rice", price: 200 },
  { id: 209, name: "Chicken Combination Fried Rice", price: 220 },
  { id: 210, name: "Chicken Schezwan Fried Rice", price: 220 },
  { id: 211, name: "Chicken Singapore Fried Rice", price: 240 },
  { id: 212, name: "Chicken Hong Kong Fried Rice", price: 240 },
  { id: 213, name: "Chicken Burnt Garlic Fried Rice", price: 250 },
  { id: 214, name: "Chicken Chopper Rice", price: 260 },
  { id: 215, name: "Chicken Manchurian Fried Rice", price: 280 },
  { id: 216, name: "Chicken Tripple Schezwan Fried Rice", price: 280 },
  { id: 217, name: "Non Veg Mixed Fried Rice", price: 300 },
  { id: 218, name: "Chicken American Chopsuey", price: 280 },
  { id: 219, name: "Mutton Fried Rice", price: 280 },
  { id: 220, name: "Prawns Fried Rice", price: 280 },
  { id: 221, name: "Egg Fried Rice", price: 170 },

  // NOODLES (VEG)
  { id: 222, name: "Veg Hakka Noodles", price: 180 },
  { id: 223, name: "Veg Schezwan Noodles", price: 190 },
  { id: 224, name: "Mixed Veg Hakka Noodles", price: 190 },
  { id: 225, name: "Veg Singapore Noodles", price: 190 },
  { id: 226, name: "Veg Hong Kong Noodles", price: 190 },
  { id: 227, name: "Veg Manchurian Noodles", price: 220 },

  // NOODLES (NON VEG)
  { id: 228, name: "Chicken Hakka Noodles", price: 200 },
  { id: 229, name: "Chicken Schezwan Noodles", price: 220 },
  { id: 230, name: "Chicken Singapore Noodles", price: 240 },
  { id: 231, name: "Chicken Hong Kong Noodles", price: 240 },
  { id: 232, name: "Chicken Manchurian Noodles", price: 260 },
  { id: 233, name: "Non Veg Mixed Hakka Noodles", price: 280 },
  { id: 234, name: "Mutton Hakka Noodles", price: 280 },
  { id: 235, name: "Prawns Hakka Noodles", price: 280 },
  { id: 236, name: "Egg Hakka Noodles", price: 190 },

  // NORTH INDIAN MAIN COURSE (VEG)
  { id: 237, name: "Dal Fry", price: 150 },
  { id: 238, name: "Dal Tadka", price: 160 },
  { id: 239, name: "Dal Kolhapuri", price: 160 },
  { id: 240, name: "Dal Palak", price: 160 },
  { id: 241, name: "Aloo Jeera", price: 160 },
  { id: 242, name: "Aloo Palak", price: 160 },
  { id: 243, name: "Tomato Masala", price: 180 },
  { id: 244, name: "Green Peas Masala Fry", price: 180 },
  { id: 245, name: "Mushroom Masala", price: 200 },
  { id: 246, name: "Mushroom Handi / Kadai", price: 220 },
  { id: 247, name: "Veg Chatpata", price: 180 },
  { id: 248, name: "Veg Kadai / Handi", price: 180 },
  { id: 249, name: "Veg Jaipuri", price: 200 },
  { id: 250, name: "Veg Keema Masala", price: 200 },
  { id: 251, name: "Veg Bhuna Masala", price: 220 },
  { id: 252, name: "Veg Jalfrezi", price: 220 },
  { id: 253, name: "Veg Kofta", price: 220 },
  { id: 254, name: "Veg Maharaja", price: 220 },
  { id: 255, name: "Veg Tawa", price: 220 },
  { id: 256, name: "Veg Kolhapuri Hyderabadi", price: 200 },
  { id: 257, name: "Veg Diwani Handi", price: 220 },
  { id: 258, name: "Paneer Lachha Masala", price: 200 },
  { id: 259, name: "Paneer Palak", price: 220 },
  { id: 260, name: "Paneer Butter Masala", price: 240 },
  { id: 261, name: "Paneer Korma", price: 240 },
  { id: 262, name: "Paneer Lazeez", price: 240 },
  { id: 263, name: "Paneer Mutter", price: 240 },
  { id: 264, name: "Kaju Masala", price: 250 },
  { id: 265, name: "Paneer Malai Kofta", price: 250 },
  { id: 266, name: "Paneer Bhurji", price: 260 },
  { id: 267, name: "Paneer Tikka Masala", price: 280 },
  { id: 268, name: "Balaji Special Veg", price: 300 },

  // NORTH INDIAN MAIN COURSE (NON VEG)
  { id: 269, name: "Egg Masala", price: 240 },
  { id: 270, name: "Chicken Masala", price: 250 },
  { id: 271, name: "Chicken Kadai", price: 250 },
  { id: 272, name: "Chicken Stew", price: 250 },
  { id: 273, name: "Chicken Do Pyaza", price: 250 },
  { id: 274, name: "Chicken Hyderabadi", price: 260 },
  { id: 275, name: "Chicken Kolhapuri", price: 260 },
  { id: 276, name: "Chicken Tikka Masala", price: 280 },
  { id: 277, name: "Chicken Chettinad", price: 280 },
  { id: 278, name: "Chicken Lijjat", price: 280 },
  { id: 279, name: "Chicken Maratha", price: 280 },
  { id: 280, name: "Chicken Tawa Masala", price: 280 },
  { id: 281, name: "Chicken Changezi", price: 290 },
  { id: 282, name: "Chicken Amritsari", price: 290 },
  { id: 283, name: "Chicken Kali Mirch", price: 290 },
  { id: 284, name: "Chicken Reshmi Masala", price: 300 },
  { id: 285, name: "Chicken Alishan Masala", price: 300 },
  { id: 286, name: "Chicken Keema Masala", price: 320 },
  { id: 287, name: "Chicken Angara Masala", price: 320 },
  { id: 288, name: "Chicken Patiala", price: 360 },
  { id: 289, name: "Chicken Handi Half", price: 240 },
  { id: 290, name: "Chicken Handi Full", price: 400 },
  { id: 291, name: "Butter Chicken Half", price: 260 },
  { id: 292, name: "Butter Chicken Full", price: 480 },
  { id: 293, name: "Chicken Murgh Musallam Half", price: 300 },
  { id: 294, name: "Chicken Murgh Musallam Full", price: 580 },
  { id: 295, name: "Chicken Malvani Masala Half", price: 260 },
  { id: 296, name: "Chicken Malvani Masala Full", price: 500 },
  { id: 297, name: "Chicken Rogan Josh", price: 350 },
  { id: 298, name: "Balaji Special Chicken", price: 450 },
  { id: 299, name: "Mutton Handi", price: 480 },
  { id: 300, name: "Mutton Kadai", price: 480 },
  { id: 301, name: "Mutton Kolhapuri", price: 460 },
  { id: 302, name: "Mutton Hyderabadi", price: 460 },
  { id: 303, name: "Mutton Rogan Josh", price: 420 },

  // ROTTI / BREAD
  { id: 304, name: "Rotti / Butter Rotti", price: 35 },
  { id: 305, name: "Kulcha / Butter Kulcha", price: 45 },
  { id: 306, name: "Naan / Butter Naan", price: 55 },
  { id: 307, name: "Lachha Paratha / Butter", price: 55 },
  { id: 308, name: "Garlic Naan / Butter", price: 70 },
  { id: 309, name: "Cheese Garlic Naan", price: 85 },
  { id: 310, name: "Methi Paratha", price: 60 },
  { id: 311, name: "Aloo Paratha", price: 80 },
  { id: 312, name: "Roomali Roti", price: 80 },
  { id: 313, name: "Cheese Paratha", price: 100 },
  { id: 314, name: "Amritsari Naan", price: 100 },
  { id: 315, name: "Kashmiri Naan", price: 120 },
  { id: 316, name: "Roti Ki Tokri", price: 320 },

  // BIRYANI RICE (VEG)
  { id: 317, name: "Green Peas Pulao", price: 180 },
  { id: 318, name: "Veg Pulao", price: 180 },
  { id: 319, name: "Veg Biryani", price: 190 },
  { id: 320, name: "Veg Hyderabadi Biryani", price: 200 },
  { id: 321, name: "Kashmiri Pulao", price: 220 },
  { id: 322, name: "Paneer Tikka Biryani", price: 260 },

  // BIRYANI RICE (NON VEG)
  { id: 323, name: "Egg Biryani", price: 190 },
  { id: 324, name: "Chicken Pulao", price: 240 },
  { id: 325, name: "Chicken Biryani Half", price: 260 },
  { id: 326, name: "Chicken Biryani Full", price: 260 },
  { id: 327, name: "Chicken Keema Biryani", price: 280 },
  { id: 328, name: "Chicken Hyderabadi Biryani", price: 280 },
  { id: 329, name: "Chicken Dum Biryani", price: 280 },
  { id: 330, name: "Chicken Tikka Biryani", price: 300 },
  { id: 331, name: "Prawns Biryani", price: 400 },
  { id: 332, name: "Fish Biryani", price: null },
  { id: 333, name: "Mutton Biryani Half", price: 400 },
  { id: 334, name: "Mutton Biryani Full", price: 400 },
  { id: 335, name: "Mutton Hyderabadi Biryani", price: 410 },

  // RICE
  { id: 336, name: "White Rice", price: 40 },
  { id: 337, name: "Boiled Rice", price: 40 },
  { id: 338, name: "Steamed Rice", price: 80 },
  { id: 339, name: "Biryani Rice Half", price: 80 },
  { id: 340, name: "Biryani Rice Full", price: 140 },
  { id: 341, name: "Jeera Rice", price: 180 },
  { id: 342, name: "Ghee Rice", price: 190 },
  { id: 343, name: "Palak Khichdi", price: 180 },
  { id: 344, name: "Dal Khichdi / Tadka", price: 180 },
  { id: 345, name: "Curd Rice Special", price: 140 },

  // FRUIT JUICE
  { id: 346, name: "Fresh Lime Juice", price: 50 },
  { id: 347, name: "Fresh Lime Soda", price: 60 },
  { id: 348, name: "Mint Lime Juice", price: 60 },
  { id: 349, name: "Mint Lime Soda", price: 70 },
  { id: 350, name: "Pineapple Juice", price: 110 },
  { id: 351, name: "Watermelon Juice", price: 110 },
  { id: 352, name: "Apple Juice", price: 140 },
  { id: 353, name: "Pomegranate Juice", price: 140 },

  // MILK SHAKE
  { id: 354, name: "Butter Milk", price: 40 },
  { id: 355, name: "Lassi Sweet", price: 80 },
  { id: 356, name: "Flavoured Lassi", price: 100 },
  { id: 357, name: "Flavoured Milk Shake Vanilla", price: 140 },
  { id: 358, name: "Flavoured Milk Shake Strawberry", price: 140 },
  { id: 359, name: "Flavoured Milk Shake Chocolate", price: 140 },
  { id: 360, name: "Pomegranate Milk Shake", price: 160 },
  { id: 361, name: "Chikku Milk Shake", price: 160 },
  { id: 362, name: "Apple Milk Shake", price: 160 },
  { id: 363, name: "Dry Fruit Milk Shake", price: 200 },

  // DESSERTS
  { id: 364, name: "Single Scoop Ice Cream", price: 50 },
  { id: 365, name: "Pan Ice Cream Single Scoop", price: 70 },
  { id: 366, name: "Ice Cream Scoop Vanilla", price: 100 },
  { id: 367, name: "Ice Cream Scoop Strawberry", price: 100 },
  { id: 368, name: "Ice Cream Scoop Chocolate", price: 140 },
  { id: 369, name: "Gulab Jamun", price: 90 },
  { id: 370, name: "Fruit Salad", price: 120 },
  { id: 371, name: "Gulab Jamun With Ice Cream", price: 130 },
  { id: 372, name: "Pan Ice Cream", price: null },
  { id: 373, name: "Dry Fruit Ice Cream", price: null },
  { id: 374, name: "Fruit Salad With Ice Cream", price: 140 },
  { id: 375, name: "Fruit Platter", price: 160 },
  { id: 376, name: "Balaji Special Dry Fruit Ice Cream", price: 180 },
  { id: 377, name: "Gadbad", price: 180 },
  { id: 378, name: "Brownie With Ice Cream", price: 200 },

  // AERATED DRINKS
  { id: 379, name: "Mineral Water 500ml", price: 20 },
  { id: 380, name: "Mineral Water 1L", price: 30 },
  { id: 381, name: "Soda 300ml", price: 20 },
  { id: 382, name: "Soda 500ml", price: 30 },
  { id: 383, name: "Soft Drink 300ml", price: 35 },
  { id: 384, name: "Soft Drink 500ml", price: 70 },
  { id: 385, name: "Monster", price: 165 },
  { id: 386, name: "Redbull", price: 170 }

];

// get menu
app.get("/menu", (req, res) => {
  res.json(menu);
});

// add item
app.post("/delete-item/:id", (req, res) => {
  const id = Number(req.params.id);

  menu = menu.filter(item => item.id !== id);

  res.send("Deleted");
});
app.post("/add-item", (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name,
    price: Number(req.body.price)
  };
  menu.push(newItem);
  res.send("Item added");
});


// ================= ORDERS =================

let orders = [];

// receive order
app.post("/order", (req, res) => {
  orders.push(req.body);
  console.log("New Order:", req.body);
  res.send("Order received");
});

// mark order done
app.post("/done/:id", (req, res) => {
  const id = req.params.id;
  orders.splice(id, 1);
  res.send("Removed");
});

// ================= ADMIN PANEL =================

app.get("/admin", (req, res) => {

  let html = `
    <h1>Admin Panel</h1>

    <input id="search" placeholder="Search food">
    <br><br>

    Name:
    <input id="name">

    Price:
    <input id="price">

    <button onclick="addItem()">Add Item</button>

    <hr>

    <div id="menu"></div>

    <script>

      let foods = [];

      function loadMenu() {
        fetch('/menu')
          .then(res => res.json())
          .then(data => {

            foods = data;
            showFoods(data);

          });
      }

      function showFoods(items) {

        document.getElementById('menu').innerHTML =
          items.map(item => \`
            <div style="margin-bottom:10px; border:1px solid black; padding:10px;">

              <b>\${item.name}</b><br>
              ₹\${item.price}<br>
              ID: \${item.id}<br><br>

              <button onclick="deleteItem(\${item.id})">
                Delete
              </button>

            </div>
          \`).join("");

      }

      function addItem() {

        fetch('/add-item', {

          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body: JSON.stringify({
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
          })

        })
        .then(() => {
          loadMenu();
        });

      }

      function deleteItem(id) {

        fetch('/delete-item/' + id, {
          method:'POST'
        })
        .then(() => {
          loadMenu();
        });

      }

      document.getElementById('search')
        .addEventListener('input', function() {

          const text = this.value.toLowerCase();

          const filtered = foods.filter(food =>
            food.name.toLowerCase().includes(text)
          );

          showFoods(filtered);

      });

      loadMenu();

    </script>
  `;

  res.send(html);

});

// ================= ORDERS PAGE =================

app.get("/orders", (req, res) => {
  let html = "<h1>📦 Orders</h1>";

  orders.forEach((order, index) => {
    let total = 0;

    let itemsHTML = order.items.map(item => {
      total += item.price * item.quantity;

      return `
        <div>
          ${item.name} x${item.quantity}<br>
          <small>${item.custom || ""}</small><br>
          ₹${item.price * item.quantity}
        </div>
      `;
    }).join("<br>");

    html += `
      <div style="border:1px solid black; padding:10px; margin:10px;">
        <b>Table:</b> ${order.table}<br>
<b>Time:</b> ${order.time}<br><br>
        ${itemsHTML}
        <h3>Total: ₹${total}</h3>
        <button onclick="done(${index})">Done</button>
      </div>
    `;
  });

  html += `
    <script>
      function done(id) {
        fetch('/done/' + id, { method: 'POST' })
          .then(() => location.reload());
      }

      // 🔄 auto refresh orders every 3 sec
setInterval(() => {
  location.reload();
}, 3000);

    </script>
  `;

  res.send(html);
});

// ================= START =================

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});