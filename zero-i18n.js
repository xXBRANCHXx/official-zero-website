const LANGUAGE_STORAGE_KEY = 'zero_language_v1';
const LANGUAGE_MANUAL_KEY = 'zero_language_manual_v1';
const LANGUAGE_ICON_URL = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/translate.svg';
const COUNTRY_ENDPOINT = 'https://ipapi.co/country/';
const INDONESIA_TIME_ZONES = new Set([
    'Asia/Jakarta',
    'Asia/Makassar',
    'Asia/Jayapura',
    'Asia/Pontianak',
]);

const ID_TRANSLATIONS = {
    'About': 'Tentang',
    'About ZERO': 'ZERO',
    'About ZERO Foods Indonesia | Team, Products & Yogyakarta Location': 'Tentang ZERO Foods Indonesia | Tim, Produk & Lokasi Yogyakarta',
    'Add ACVS directly to cart and checkout from the site.': 'Tambahkan ACVS langsung ke keranjang dan checkout dari situs.',
    'Add Fiber Syrup directly to the ZERO cart without leaving the product page.': 'Tambahkan Fiber Syrup langsung ke keranjang ZERO tanpa meninggalkan halaman produk.',
    'Add To Cart': 'Tambah ke Keranjang',
    'Added!': 'Ditambahkan!',
    'A concentrated dropper for people who want ZERO close by without carrying a full bottle. Five to seven drops are enough to sweeten coffee, tea, water, and drinks on the move.': 'Tetesan pekat untuk pelanggan yang ingin ZERO selalu dekat tanpa membawa botol besar. Lima sampai tujuh tetes cukup untuk memaniskan kopi, teh, air, dan minuman saat bepergian.',
    'A concentrated dropper for sweetening drinks without carrying a full bottle. Keep it at work, in your bag, or beside your coffee setup.': 'Tetesan pekat untuk memaniskan minuman tanpa membawa botol besar. Simpan di meja kerja, tas, atau area kopi Anda.',
    'A heavier zero-calorie maple topping for pancakes, yogurt, bowls, and food applications.': 'Maple topping nol kalori yang lebih kental untuk pancake, yogurt, bowl, dan penggunaan makanan.',
    'A prebiotic fiber syrup made for easy daily mixing.': 'Sirup serat prebiotik yang mudah dicampur setiap hari.',
    'A small amount can sweeten coffee, tea, water, and mixed drinks on the move.': 'Sedikit tetes sudah cukup untuk memaniskan kopi, teh, air, dan minuman campuran saat bepergian.',
    'A small team building the product, brand, operations, and customer experience behind ZERO Foods Indonesia.': 'Tim kecil yang membangun produk, merek, operasional, dan pengalaman pelanggan di balik ZERO Foods Indonesia.',
    'A sweeter fiber syrup profile for water and cold drinks.': 'Profil fiber syrup yang lebih manis untuk air dan minuman dingin.',
    'A thick zero-calorie topping with real maple extract made for pancakes, yogurt, and heavier pours.': 'Topping nol kalori yang kental dengan ekstrak maple asli untuk pancake, yogurt, dan tuangan yang lebih berisi.',
    'A thicker zero-calorie maple pour for pancakes, waffles, yogurt bowls, desserts, and breakfast plates. This is the food topping, not the maple flavor for coffee.': 'Tuangan maple nol kalori yang lebih kental untuk pancake, waffle, yogurt bowl, dessert, dan menu sarapan. Ini adalah topping makanan, bukan rasa maple untuk kopi.',
    'A thicker zero-calorie maple pour for pancakes, waffles, yogurt bowls, and desserts.': 'Tuangan maple nol kalori yang lebih kental untuk pancake, waffle, yogurt bowl, dan dessert.',
    'A zero-calorie syrup line made for coffee, matcha, refreshers, mocktails, and home routines. Choose the flavor, choose the bottle, and build the order from here.': 'Rangkaian sirup nol kalori untuk kopi, matcha, refresher, mocktail, dan rutinitas di rumah. Pilih rasa, pilih ukuran botol, lalu susun pesanan dari sini.',
    '100ml and 250ml formats support trial or routine usage.': 'Format 100 ml dan 250 ml mendukung penggunaan coba maupun rutinitas.',
    'ACVS keeps the apple cider vinegar function in an easier syrup format, with trial and routine sizes available from the page cart.': 'ACVS mempertahankan fungsi cuka apel dalam format sirup yang lebih mudah, dengan ukuran coba dan ukuran rutin tersedia dari keranjang halaman.',
    'All flavors': 'Semua rasa',
    'Also reviewed by regulators, but ZERO is not building this line around it. Products containing aspartame can require specific phenylalanine warnings for people with phenylketonuria.': 'Aspartam juga telah ditinjau regulator, tetapi ZERO tidak membangun lini produk ini dengan pemanis tersebut. Produk yang mengandung aspartam dapat memerlukan peringatan fenilalanin khusus bagi orang dengan fenilketonuria.',
    'Apple Cider Vinegar Syrup': 'Sirup Cuka Apel',
    'Apple cider vinegar syrup keeps the function while making daily use easier.': 'Sirup cuka apel mempertahankan fungsinya sekaligus membuat penggunaan harian lebih mudah.',
    'Apple cider vinegar syrup with the mother, built for easier daily use.': 'Sirup cuka apel dengan mother, dibuat agar lebih mudah dikonsumsi setiap hari.',
    'Approved steviol glycosides are a valid sweetener category, but many customers notice bitter, herbal, or lingering notes. ZERO prioritizes repeatable taste.': 'Glikosida steviol yang disetujui regulator adalah kategori pemanis yang sah, tetapi banyak pelanggan merasakan nada pahit, herbal, atau aftertaste yang menetap. ZERO memprioritaskan rasa yang nyaman dikonsumsi berulang.',
    'Aspartame and Other Sweeteners in Food': 'Aspartam dan Pemanis Lain dalam Makanan',
    '2 Bottle Sizes': '2 Ukuran Botol',
    '5ml, 10ml, and 30ml formats support trial, pocket carry, and fuller daily use.': 'Format 5 ml, 10 ml, dan 30 ml mendukung kebutuhan coba, dibawa di saku, dan penggunaan harian yang lebih penuh.',
    'Bang ZERO runs the tests like a curious friend: wear the CGM, eat the food, wait for the curve, then explain what happened in plain language.': 'Bang ZERO menjalankan tes seperti teman yang penasaran: memakai CGM, mencoba makanannya, menunggu kurvanya, lalu menjelaskan hasilnya dengan bahasa sederhana.',
    'Bang ZERO uses a CGM to test everyday foods, show what spikes blood sugar, and explain the chart without turning it into a lecture.': 'Bang ZERO menggunakan CGM untuk menguji makanan sehari-hari, menunjukkan pemicu lonjakan gula darah, dan menjelaskan grafiknya tanpa terasa seperti kuliah.',
    'Bang ZERO wears a CGM, tries real foods, then explains the glucose chart in a way that is easy to follow.': 'Bang ZERO memakai CGM, mencoba makanan asli, lalu menjelaskan grafik glukosa dengan cara yang mudah diikuti.',
    'Best for': 'Paling cocok untuk',
    'Best value': 'Paling hemat',
    'Better-tasting sweetness': 'Manis Enak',
    'Bottle sizes': 'Ukuran',
    'Browse Products': 'Lihat Produk',
    'Builds the digital experience, marketing direction, and product storytelling for ZERO.': 'Membangun pengalaman digital, arah pemasaran, dan storytelling produk untuk ZERO.',
    'Built around taste first': 'Dibangun dengan rasa sebagai prioritas',
    'Built for Better Daily Habits.': 'Kebiasaan Baik.',
    'Built for pancakes, waffles, yogurt bowls, desserts, and thicker pours.': 'Dibuat untuk pancake, waffle, yogurt bowl, dessert, dan tuangan yang lebih kental.',
    'Built for repeat daily use instead of occasional use.': 'Dibuat untuk penggunaan harian berulang, bukan hanya sesekali.',
    'Built For Repeat Daily Use.': 'Untuk Harian.',
    'Buy Maple Topping': 'Beli Maple Topping',
    'Buy ZERO Drops': 'Beli ZERO Drops',
    'Buy ZERO Syrup': 'Beli ZERO Syrup',
    'Calories': 'Kalori',
    'Cancel': 'Batal',
    'Cart': 'Keranjang',
    'Cart item count': 'Jumlah item keranjang',
    'Cart Ready': 'Siap Masuk Keranjang',
    'Catalog': 'Katalog',
    'Catalog sections': 'Bagian katalog',
    'CEO & Co-owner': 'CEO & Co-owner',
    'CGM food tests': 'Tes makanan dengan CGM',
    'Chart explainers': 'Penjelasan grafik',
    'Checkout': 'Checkout',
    'Checkout opens WhatsApp with your order and total already formatted.': 'Checkout akan membuka WhatsApp dengan pesanan dan total yang sudah diformat.',
    'Choose A Flavor': 'Pilih Rasa',
    'Choose A Size': 'Pilih Ukuran',
    'Choose A Variant': 'Pilih Varian',
    'Choose product variants': 'Pilih varian produk',
    'Choose the dropper that fits your routine.': 'Pilih Drops.',
    'Choose the fiber syrup that fits your drink.': 'Pilih Fiber.',
    'Choose Your ZERO.': 'Pilih ZERO.',
    'Classic caramel coffee syrup.': 'Sirup karamel klasik untuk kopi.',
    'Classic caramel sweetness.': 'Manis karamel klasik.',
    'Clear Cart': 'Kosongkan Keranjang',
    'Close cart': 'Tutup keranjang',
    'Close checkout form': 'Tutup formulir checkout',
    'Close modal': 'Tutup modal',
    'Close search': 'Tutup pencarian',
    'CMO & Web Developer': 'CMO & Web Developer',
    'Co-founder': 'Co-founder',
    'Co-founder & R&D Specialist': 'Co-founder & Spesialis R&D',
    'Coffee classics and fruit-forward flavors in one consistent zero-calorie syrup system.': 'Rasa klasik untuk kopi dan pilihan buah dalam satu sistem sirup nol kalori yang konsisten.',
    'Coffee classics plus fruit-forward options.': 'Rasa klasik kopi plus pilihan rasa buah.',
    'Coffee Flavors': 'Rasa Kopi',
    'Coffee flavors only': 'Khusus rasa kopi',
    'Coffee flavors plus fruit-forward options make Drops the portable side of ZERO.': 'Rasa kopi dan pilihan buah menjadikan Drops sisi portabel dari ZERO.',
    'Coffee, refreshers, home drinks, and repeat kitchen use.': 'Kopi, refresher, minuman rumahan, dan penggunaan dapur berulang.',
    'Company': 'Perusahaan',
    'Compare the ZERO lineup: zero-calorie syrup for drinks, portable ZERO Drops, thicker Maple Topping, and ZFIT fiber syrup and ACVS products.': 'Bandingkan rangkaian ZERO: sirup nol kalori untuk minuman, ZERO Drops portabel, Maple Topping yang lebih kental, serta produk ZFIT fiber syrup dan ACVS.',
    'Compare ZERO Syrup, ZERO Drops, Maple Topping, and the full product lineup.': 'Bandingkan ZERO Syrup, ZERO Drops, Maple Topping, dan seluruh rangkaian produk.',
    'Concentrated drops in a pocket-sized format for travel, work, gym bags, and quick drink mixing.': 'Drops pekat dalam format ringkas untuk perjalanan, kerja, tas gym, dan racikan minuman cepat.',
    'Concentrated liquid sweetness in a glass dropper for customers who want a portable format that works in water, tea, coffee, and drinks on the move.': 'Pemanis cair pekat dalam botol tetes kaca untuk pelanggan yang ingin format portabel untuk air, teh, kopi, dan minuman saat bepergian.',
    'Continue to WhatsApp': 'Lanjut ke WhatsApp',
    'Copyright 2026 ZERO Foods Indonesia. All rights reserved.': 'Hak cipta 2026 ZERO Foods Indonesia. Seluruh hak dilindungi.',
    'Customer reviews': 'Ulasan pelanggan',
    'Customers can order through direct channels, marketplaces, and social platforms, then come back to the same format that fits their routine.': 'Pelanggan dapat memesan melalui kanal langsung, marketplace, dan platform sosial, lalu kembali ke format yang paling sesuai dengan rutinitas mereka.',
    'Customers can order through WhatsApp, Shopee, Tokopedia, TikTok Shop, and ZERO social channels.': 'Pelanggan dapat memesan melalui WhatsApp, Shopee, Tokopedia, TikTok Shop, dan kanal sosial ZERO.',
    'Customers with medical conditions, allergies, pregnancy-related concerns, medication interactions, or specific dietary restrictions should review the label and speak with a qualified professional before use.': 'Pelanggan dengan kondisi medis, alergi, pertimbangan kehamilan, interaksi obat, atau batasan diet khusus sebaiknya membaca label dan berkonsultasi dengan tenaga profesional sebelum menggunakan produk.',
    'Daily Wellness': 'Wellness Harian',
    'Delivery Address': 'Alamat Pengiriman',
    'Delivery Details': 'Detail Pengiriman',
    'Decrease quantity by one': 'Kurangi jumlah satu',
    'Designed for coffee, matcha, refreshers, mocktails, and home routines without calories.': 'Dirancang untuk kopi, matcha, refresher, mocktail, dan rutinitas rumah tanpa kalori.',
    'Disclaimer': 'Disclaimer',
    'Drops': 'Drops',
    'Drops per drink': 'Tetes per minuman',
    'Drops: Rp20K to Rp49K': 'Drops: Rp20 rb sampai Rp49 rb',
    'Each post focuses on what the chart shows: how fast glucose rises, how high it goes, how long it stays elevated, and what might explain the shape of the curve.': 'Setiap unggahan fokus pada hal yang ditunjukkan grafik: seberapa cepat glukosa naik, setinggi apa kenaikannya, berapa lama bertahan, dan apa yang mungkin menjelaskan bentuk kurvanya.',
    'Each product has a clear job, so customers can choose by routine instead of guessing from a shelf of similar bottles.': 'Setiap produk punya fungsi yang jelas, sehingga pelanggan dapat memilih berdasarkan rutinitas, bukan menebak dari rak berisi botol yang terlihat mirip.',
    'Easy to find': 'Mudah Dicari',
    'Easy to order and repeat': 'Mudah Dipesan',
    'EFSA plain-language summary stating that the previously established sucralose ADI did not need to change.': 'Ringkasan EFSA dalam bahasa sederhana yang menyatakan ADI sukralosa yang sebelumnya ditetapkan tidak perlu diubah.',
    'Enak banget, zero calorie, dan cocok buat yang lagi monitor sugar intake.': 'Enak banget, nol kalori, dan cocok buat yang lagi memantau asupan gula.',
    'European Food Safety Authority background on sweetener assessment and re-evaluation work.': 'Latar belakang European Food Safety Authority tentang penilaian pemanis dan proses evaluasi ulang.',
    'Every syrup flavor follows the same size pricing: 50ml for trial, 250ml for daily use, and 550ml for stocking up.': 'Setiap rasa syrup mengikuti struktur ukuran yang sama: 50 ml untuk coba, 250 ml untuk penggunaan harian, dan 550 ml untuk stok.',
    'Explore ZFIT products from ZERO Foods Indonesia, including prebiotic fiber syrup and ACVS apple cider vinegar syrup for daily drink routines.': 'Jelajahi produk ZFIT dari ZERO Foods Indonesia, termasuk prebiotic fiber syrup dan ACVS apple cider vinegar syrup untuk rutinitas minuman harian.',
    'FDA overview of high-intensity sweeteners permitted or reviewed for use in foods, including sucralose and certain steviol glycosides.': 'Ikhtisar FDA tentang pemanis intensitas tinggi yang diizinkan atau ditinjau untuk makanan, termasuk sukralosa dan beberapa glikosida steviol.',
    'FDA summary covering sucralose, aspartame, stevia-derived substances, acceptable daily intake, and safety review context.': 'Ringkasan FDA tentang sukralosa, aspartam, zat turunan stevia, acceptable daily intake, dan konteks peninjauan keamanan.',
    'Fiber support': 'Dukungan serat',
    'Fiber Syrup': 'Fiber Syrup',
    'Fiber Syrup gives customers a sweeter route into prebiotic support.': 'Fiber Syrup memberi pelanggan cara yang lebih nyaman untuk mendapatkan dukungan prebiotik.',
    'Fiber Syrup is the daily prebiotic format in ZFIT. Pick the flavor profile, add it to cart, and check out with the same ZERO cart used across the site.': 'Fiber Syrup adalah format prebiotik harian dari ZFIT. Pilih profil rasa, tambahkan ke keranjang, lalu checkout dengan keranjang ZERO yang sama di seluruh situs.',
    'Find ZERO in Yogyakarta.': 'ZERO di Yogyakarta.',
    'Flavor options': 'Pilihan Rasa',
    'Flavor paths': 'Profil Rasa',
    'Follow': 'Ikuti',
    'Follow ZERO on Facebook': 'Ikuti ZERO di Facebook',
    'Follow ZERO on Instagram': 'Ikuti ZERO di Instagram',
    'Follow ZERO on TikTok': 'Ikuti ZERO di TikTok',
    'Follow ZERO on YouTube': 'Ikuti ZERO di YouTube',
    'Food experiments': 'Eksperimen makanan',
    'Food topping': 'Topping makanan',
    'Food topping format': 'Format topping makanan',
    'For daily drinks.': 'Untuk Minuman.',
    'For sweetness anywhere.': 'Manis Portabel.',
    'For thicker pours.': 'Tuangan Kental.',
    'For ZERO, the choice is practical: clean taste, reliable sweetness, and a formula people are more likely to keep using instead of returning to sugar.': 'Bagi ZERO, pilihannya praktis: rasa yang bersih, manis yang konsisten, dan formula yang lebih mungkin terus dipakai pelanggan daripada kembali ke gula.',
    'Full flavor. Zero sugar. Made for the drinks and routines people already love.': 'Rasa penuh. Tanpa gula. Dibuat untuk minuman dan rutinitas yang sudah disukai pelanggan.',
    'Full Name': 'Nama Lengkap',
    'Full-size zero-calorie syrup bottles for coffee, refreshers, tea, and daily drinks.': 'Botol sirup nol kalori ukuran penuh untuk kopi, refresher, teh, dan minuman harian.',
    'Function, Without Making The Routine Harder.': 'Fungsi Praktis.',
    'Functional support': 'Dukungan Fungsi',
    'Functional wellness products including fiber syrup and apple cider vinegar syrup.': 'Produk wellness fungsional termasuk fiber syrup dan apple cider vinegar syrup.',
    'General product information': 'Informasi produk umum',
    'Guilt? Zero. Flavor? Everything.': 'Rasa bersalah? Zero. Rasa? Maksimal.',
    'Healthy choices made easy.': 'Pilihan Sehat.',
    'Healthy choices,': 'Sehat.',
    'Healthy choices, made easier.': 'Sehat. Mudah.',
    'Healthy sweetness made easy.': 'Manis Sehat.',
    'Helps shape ZERO\'s product direction and the brand\'s practical, daily-use focus.': 'Membantu membentuk arah produk ZERO dan fokus merek yang praktis untuk penggunaan harian.',
    'High-Intensity Sweeteners': 'Pemanis Intensitas Tinggi',
    'Home': 'Beranda',
    'Hosted by Bang ZERO': 'Dipandu oleh Bang ZERO',
    'Important distinction': 'Perbedaan penting',
    'Increase quantity by one': 'Tambah jumlah satu',
    'Indonesia\'s #1 Best-Selling Zero-Calorie Syrup.': 'Sirup Nol Kalori #1.',
    'Indonesian Food Additive Sweetener Limits': 'Batas Penggunaan Pemanis Bahan Tambahan Pangan Indonesia',
    'Indonesian regulatory reference for maximum permitted use levels across food categories.': 'Referensi regulasi Indonesia untuk batas maksimum penggunaan yang diizinkan di berbagai kategori pangan.',
    'Ingredient and nutrition statements': 'Pernyataan bahan dan nutrisi',
    'Items': 'Produk',
    'Keeps the full ACV function while being easier to mix into drinks.': 'Mempertahankan fungsi ACV secara penuh sekaligus lebih mudah dicampur ke minuman.',
    'Lab certification': 'Sertifikasi lab',
    'Lab Certified.': 'Tersertifikasi.',
    'Leads ZERO\'s business direction, operations, and customer-facing standards.': 'Memimpin arah bisnis, operasional, dan standar layanan pelanggan ZERO.',
    'Learn More': 'Pelajari Lebih Lanjut',
    'Learn more about ZERO social food spike tests': 'Pelajari lebih lanjut tentang tes lonjakan gula makanan dari ZERO Social',
    'Legal Info': 'Info Legal',
    'Legal Info / intentionally boring / updated 2026': 'Info Legal / update 2026',
    'Lineup': 'Rangkaian',
    'Loading ZERO website': 'Memuat situs ZERO',
    'Made For Food, Not Coffee.': 'Untuk Makanan.',
    'Made for food instead of coffee. Maple Topping is the thicker ZERO format for pancakes, waffles, yogurt bowls, desserts, and any pour that needs more body.': 'Dibuat untuk makanan, bukan kopi. Maple Topping adalah format ZERO yang lebih kental untuk pancake, waffle, yogurt bowl, dessert, dan setiap tuangan yang membutuhkan lebih banyak body.',
    'Made for specific use cases': 'Dibuat untuk kebutuhan yang spesifik',
    'Maple Topping': 'Maple Topping',
    'Maple Topping comes in a single 550ml food format, built for thicker pours where a drink syrup would feel too light.': 'Satu ukuran 550 ml untuk tuangan makanan yang lebih kental.',
    'Maple Topping in Catalog': 'Maple Topping di Katalog',
    'Maple Topping is the thicker product in the ZERO range, made for breakfast plates and dessert bowls where texture matters as much as sweetness.': 'Maple Topping adalah produk yang lebih kental dalam rangkaian ZERO, dibuat untuk menu sarapan dan dessert bowl ketika tekstur sama pentingnya dengan rasa manis.',
    'Maple-style sweetness for heavier food use without the sugar load.': 'Manis bergaya maple untuk penggunaan makanan yang lebih berat tanpa beban gula.',
    'Marketplace Review': 'Ulasan Marketplace',
    'made easier.': 'Mudah.',
    'Meet the team': 'Kenali tim',
    'Meet ZERO Foods Indonesia and find the team in Sleman, Yogyakarta.': 'Kenali ZERO Foods Indonesia dan temukan timnya di Sleman, Yogyakarta.',
    'Meet ZERO Foods Indonesia, the Yogyakarta-based team creating low-calorie syrups, drops, toppings, and wellness products for better daily routines.': 'Kenali ZERO Foods Indonesia, tim berbasis Yogyakarta yang membuat sirup, drops, topping, dan produk wellness rendah kalori untuk rutinitas harian yang lebih baik.',
    'minus': 'Tanpa',
    'More navigation': 'Navigasi lainnya',
    'Most popular': 'Paling populer',
    'New flavors, product drops, and ordering updates from the official ZERO channels.': 'Rasa baru, peluncuran produk, dan pembaruan pemesanan dari kanal resmi ZERO.',
    'No results found': 'Tidak ada hasil',
    'Not medical advice. Just useful food experiments.': 'Bukan Saran Medis.',
    'Nutty cafe profile for coffee drinks.': 'Profil kacang ala kafe untuk minuman kopi.',
    'Nutty coffee-house profile.': 'Profil rasa kacang ala coffee house.',
    'Nutty drops for coffee and dessert drinks.': 'Drops bernuansa kacang untuk kopi dan minuman dessert.',
    'Nutty pistachio cafe flavor.': 'Rasa pistachio bernuansa kafe.',
    'One 550ml bottle focused on topping use rather than drink mixing.': 'Satu botol 550 ml yang fokus untuk topping, bukan untuk racikan minuman.',
    'One bottle. One clear use case.': 'Satu Botol.',
    'One Brand, Three Daily Jobs.': 'Satu Brand. Tiga Fungsi.',
    'One clear product size keeps ordering simple and focused on food applications.': 'Satu ukuran produk membuat pemesanan lebih sederhana dan fokus pada penggunaan makanan.',
    'One Lineup, Three Clear Jobs.': 'Tiga Fungsi Jelas.',
    'Open cart and checkout': 'Buka keranjang dan checkout',
    'Open menu': 'Buka menu',
    'Open product menu': 'Buka menu produk',
    'Open search': 'Buka pencarian',
    'Order Drops': 'Pesan Drops',
    'Order Maple Topping': 'Pesan Maple Topping',
    'Order Syrup': 'Pesan Syrup',
    'Order ZERO Drops, a pocket-sized concentrated sweetener for coffee, tea, water, and drinks on the move in 5ml, 10ml, and 30ml formats.': 'Pesan ZERO Drops, pemanis pekat ukuran saku untuk kopi, teh, air, dan minuman saat bepergian dalam format 5 ml, 10 ml, dan 30 ml.',
    'Order ZERO Maple Topping, a thicker 550ml zero-calorie maple pour for pancakes, waffles, yogurt bowls, desserts, and breakfast plates.': 'Pesan ZERO Maple Topping, tuangan maple nol kalori 550 ml yang lebih kental untuk pancake, waffle, yogurt bowl, dessert, dan menu sarapan.',
    'Order ZERO Syrup in 16 flavors and three bottle sizes for coffee, matcha, refreshers, mocktails, and daily sugar-free drink routines.': 'Pesan ZERO Syrup dalam 16 rasa dan tiga ukuran botol untuk kopi, matcha, refresher, mocktail, dan rutinitas minuman bebas gula harian.',
    'Other Flavors': 'Rasa Lainnya',
    'Our position is narrower than most marketing claims: use less sugar, keep taste easy, and do not pretend a sweetener choice replaces the rest of a balanced diet.': 'Posisi kami lebih sederhana daripada kebanyakan klaim pemasaran: kurangi gula, jaga rasa tetap mudah dinikmati, dan jangan berpura-pura bahwa pilihan pemanis dapat menggantikan pola makan seimbang.',
    'Pancakes, yogurt, breakfast bowls, and thicker pours.': 'Pancake, yogurt, breakfast bowl, dan tuangan yang lebih kental.',
    'Pick the ACVS bottle for the routine.': 'Pilih ACVS.',
    'Pick the flavor. Match the bottle.': 'Pilih Rasa.',
    'Plain': 'Original',
    'Plain only': 'Khusus Original',
    'Portable concentrated sweetener drops for sweetness anywhere.': 'Drops pemanis pekat portabel untuk rasa manis di mana saja.',
    'Portable convenience': 'Portabel',
    'Please add your full name and delivery address before checkout.': 'Tambahkan nama lengkap dan alamat pengiriman sebelum checkout.',
    'Prebiotic fiber support in a format that can fit into coffee, water, and daily drink routines.': 'Dukungan serat prebiotik dalam format yang cocok untuk kopi, air, dan rutinitas minuman harian.',
    'Prebiotic support without changing the drink profile.': 'Dukungan prebiotik tanpa mengubah profil minuman.',
    'Primary navigation': 'Navigasi utama',
    'Product': 'Produk',
    'Product choices': 'Pilihan produk',
    'Quick spike checks': 'Cek lonjakan singkat',
    'Raw and unfiltered': 'Raw dan unfiltered',
    'Raw and Unfiltered': 'Raw dan Unfiltered',
    'Raw and unfiltered apple cider vinegar syrup.': 'Sirup cuka apel raw dan unfiltered.',
    'Raw and unfiltered apple cider vinegar syrup with the mother, positioned for easier daily use.': 'Sirup cuka apel raw dan unfiltered dengan mother, diposisikan untuk penggunaan harian yang lebih mudah.',
    'Re-evaluation of Sucralose (E 955)': 'Evaluasi Ulang Sukralosa (E 955)',
    'Read ZERO Foods Indonesia legal information, product disclaimers, ingredient context, and regulatory references for sweetener positioning.': 'Baca informasi legal ZERO Foods Indonesia, disclaimer produk, konteks bahan, dan referensi regulasi terkait posisi pemanis.',
    'Read ZERO legal information, regulatory references, and sweetener positioning.': 'Baca informasi legal ZERO, referensi regulasi, dan posisi pemanis.',
    'Real food. Real glucose curves.': 'Makanan Nyata.',
    'References to sweeteners are about formulation and taste design. They are not claims that one approved sweetener is universally healthier, safer, or medically better for every person.': 'Referensi tentang pemanis berkaitan dengan formulasi dan desain rasa. Itu bukan klaim bahwa satu pemanis yang disetujui regulator selalu lebih sehat, lebih aman, atau lebih baik secara medis untuk semua orang.',
    'Regulatory references, not hype.': 'Referensi Regulasi.',
    'Results': 'Hasil',
    'Routine size': 'Ukuran rutin',
    'Sample size': 'Ukuran coba',
    'Sample, daily-use, and value formats make it easier to trial, repeat, and stock up.': 'Format coba, penggunaan harian, dan value memudahkan pelanggan untuk mencoba, membeli ulang, dan menyimpan stok.',
    'Scroll to separate the product line.': 'Scroll untuk memisahkan lini produk.',
    'Search results': 'Hasil pencarian',
    'Search ZERO': 'Cari ZERO',
    'Search ZERO website': 'Cari di situs ZERO',
    'See the catalog overview for the daily drink bottle.': 'Lihat ringkasan katalog untuk botol minuman harian.',
    'See the catalog overview for the portable sweetener format.': 'Lihat ringkasan katalog untuk format pemanis portabel.',
    'See the catalog overview for ZERO Maple Topping.': 'Lihat ringkasan katalog untuk ZERO Maple Topping.',
    'See what spikes your blood sugar.': 'Cek Lonjakan Gula.',
    'Shop': 'Belanja',
    'Shop Drops': 'Belanja Drops',
    'Shop Syrup': 'Belanja Syrup',
    'Shop Topping': 'Belanja Topping',
    'Shopping cart': 'Keranjang belanja',
    'Single format': 'Satu format',
    'Size options': 'Pilihan ukuran',
    'Size rules': 'Aturan ukuran',
    'Small Format, Big Daily Utility.': 'Kecil. Praktis.',
    'Smooth vanilla profile.': 'Profil vanila yang halus.',
    'Smooth vanilla sweetness.': 'Manis vanila yang lembut.',
    'Social': 'Sosial',
    'Social media': 'Media sosial',
    'Source trail': 'Jejak sumber',
    'spike blood sugar.': 'memicu lonjakan gula darah.',
    'Start here for ZERO Foods Indonesia, zero sugar sweetness, product lines, reviews, and lab certification.': 'Mulai dari sini untuk ZERO Foods Indonesia, rasa manis tanpa gula, lini produk, ulasan, dan sertifikasi lab.',
    'Start with how you use sweetness. ZERO Syrup is for drinks, Drops are for portability, and Maple Topping is for thicker pours on food.': 'Mulailah dari cara Anda memakai rasa manis. ZERO Syrup untuk minuman, Drops untuk portabilitas, dan Maple Topping untuk tuangan lebih kental pada makanan.',
    'Statements such as zero sugar, zero calorie, low calorie, or sugar-free are intended to describe the relevant product format and should be read together with the product label, serving size, and local marketplace listing.': 'Pernyataan seperti zero sugar, zero calorie, low calorie, atau sugar-free dimaksudkan untuk menjelaskan format produk terkait dan harus dibaca bersama label produk, takaran saji, serta listing marketplace lokal.',
    'Strawberry': 'Stroberi',
    'Sucralose': 'Sukralosa',
    'Sugar, minus the part you did not want.': 'Manis tanpa gula.',
    'sugar.': 'gula.',
    'Sweetener rationale': 'Alasan pemilihan pemanis',
    'Sweeteners Topic Page': 'Halaman Topik Pemanis',
    'Sweetness without the sentence.': 'Manis tanpa konsekuensi.',
    'Sweetness,': 'Manis.',
    'Syrup': 'Syrup',
    'Syrup is the most flexible ZERO format: a full flavor range, steady bottle sizing, and a cleaner way to sweeten the drinks customers already make.': 'Syrup adalah format ZERO yang paling fleksibel: pilihan rasa lengkap, ukuran botol konsisten, dan cara yang lebih bersih untuk memaniskan minuman yang sudah dibuat pelanggan.',
    'Syrup: Rp10K to Rp69K': 'Syrup: Rp10 rb sampai Rp69 rb',
    'Tastes like cheating.': 'Rasanya seperti curang.',
    'Tested on taste. Certified zero.': 'Diuji dari rasa. Tersertifikasi zero.',
    'The broadest range in the lineup with the easiest daily-use format.': 'Pilihan terluas dalam rangkaian dengan format penggunaan harian yang paling mudah.',
    'The core all-purpose drops flavor.': 'Rasa drops utama untuk berbagai penggunaan.',
    'The daily drink bottle.': 'Botol Harian.',
    'The fine print.': 'Catatan Legal.',
    'The flagship ZERO format for coffee, matcha, refreshers, mocktails, and home routines. It gives you the widest flavor range in a bottle that mixes cleanly into everyday drinks.': 'Format andalan ZERO untuk kopi, matcha, refresher, mocktail, dan rutinitas di rumah. Memberi pilihan rasa terluas dalam botol yang mudah menyatu dengan minuman harian.',
    'The heavier pour.': 'Tuangan Kental.',
    'The lineup is built around those moments. Syrup covers full-bottle drink making, Drops cover portability, Maple Topping covers thicker food pours, and ZFIT extends the same routine-first approach into wellness products.': 'Rangkaian ini dibangun dari momen-momen tersebut. Syrup mencakup pembuatan minuman dengan botol penuh, Drops mencakup portabilitas, Maple Topping mencakup tuangan makanan yang lebih kental, dan ZFIT memperluas pendekatan berbasis rutinitas yang sama ke produk wellness.',
    'The most compact and portable way to keep ZERO sweetness close.': 'Cara paling ringkas dan portabel untuk menjaga rasa manis ZERO tetap dekat.',
    'The only zero worth keeping.': 'Satu-satunya zero yang layak dipertahankan.',
    'The people behind ZERO.': 'Tim ZERO.',
    'The portable sweetener.': 'Pemanis Portabel.',
    'These links are included so the sweetener discussion has a paper trail. They are not endorsements of ZERO products.': 'Tautan ini disertakan agar pembahasan pemanis memiliki jejak referensi. Ini bukan dukungan atau endorsement terhadap produk ZERO.',
    'Thick maple topping for food applications. This is not the same as ZERO Maple Syrup for coffee.': 'Maple topping kental untuk penggunaan makanan. Ini tidak sama dengan ZERO Maple Syrup untuk kopi.',
    'Thick zero-calorie maple topping for pancakes, waffles, yogurt bowls, desserts, and heavier pours that need more body than a drink syrup.': 'Maple topping nol kalori yang kental untuk pancake, waffle, yogurt bowl, dessert, dan tuangan yang membutuhkan lebih banyak body daripada sirup minuman.',
    'This is not the same as ZERO Maple Syrup flavor for coffee drinks.': 'Ini tidak sama dengan rasa ZERO Maple Syrup untuk minuman kopi.',
    'This page is deliberately tucked away. It is here for people who want the reasoning, limits, and references without turning the rest of the website into paperwork.': 'Halaman ini sengaja ditempatkan terpisah. Isinya untuk orang yang ingin memahami alasan, batasan, dan referensi tanpa mengubah seluruh situs menjadi dokumen administratif.',
    'Three formats, each built for a different daily use: full bottles for drinks, concentrated drops for carry, and a thicker maple topping for food.': 'Tiga format, masing-masing dibuat untuk penggunaan harian yang berbeda: botol penuh untuk minuman, drops pekat untuk dibawa, dan maple topping yang lebih kental untuk makanan.',
    'Three Formats. One Shared Goal.': 'Tiga Format.',
    'Topping': 'Topping',
    'Topping: Rp149K': 'Topping: Rp149 rb',
    'Travel, work desks, gym bags, and anywhere a full bottle feels too large.': 'Perjalanan, meja kerja, tas gym, dan situasi ketika botol besar terasa terlalu merepotkan.',
    'Trial size': 'Ukuran coba',
    'Try ZERO, never go back.': 'Coba ZERO, sulit kembali.',
    'Try syrup, drops, maple, ZFit, about, or legal.': 'Coba syrup, drops, maple, ZFit, tentang, atau info legal.',
    'Quantity': 'Jumlah',
    'Sold Out': 'Habis',
    'Sold out': 'Habis',
    'Unflavored': 'Tanpa rasa',
    'Unflavored for mixing and Lemonade Pomegranate for a sweeter drink profile.': 'Unflavored untuk dicampur dan Lemonade Pomegranate untuk profil minuman yang lebih manis.',
    'Units sold in 2026': 'Unit terjual pada 2026',
    'Updated daily from the Executive Dashboard.': 'Diperbarui harian dari Executive Dashboard.',
    'Used because it can deliver strong sweetness at low use levels with a neutral profile in cold drinks, coffee routines, syrups, drops, and toppings.': 'Digunakan karena dapat memberikan rasa manis yang kuat pada kadar penggunaan rendah dengan profil netral pada minuman dingin, rutinitas kopi, syrup, drops, dan topping.',
    'Variant': 'Varian',
    'View': 'Lihat',
    'View Catalog': 'Lihat Katalog',
    'View Drops': 'Lihat Drops',
    'View Maple Topping': 'Lihat Maple Topping',
    'View ZERO lab certificate results': 'Lihat hasil sertifikat lab ZERO',
    'Visit and contact': 'Kunjungan dan kontak',
    'Volume': 'Volume',
    'Watch Bang ZERO test real foods with a CGM and explain blood glucose spikes.': 'Tonton Bang ZERO menguji makanan asli dengan CGM dan menjelaskan lonjakan glukosa darah.',
    'Watch ZERO test real foods with a CGM, explain blood glucose spikes, and show why each chart curve looks the way it does.': 'Tonton ZERO menguji makanan asli dengan CGM, menjelaskan lonjakan glukosa darah, dan menunjukkan alasan bentuk setiap kurva.',
    'We do not use stevia because better-for-you only works when it is easy to keep using. Our view of healthy is the option that fits your daily routine, tastes clean, and helps you stick with it.': 'Kami tidak menggunakan stevia karena pilihan yang lebih baik untuk tubuh hanya berhasil jika mudah dikonsumsi terus-menerus. Bagi kami, pilihan sehat adalah yang cocok dengan rutinitas harian, rasanya bersih, dan membantu Anda konsisten.',
    'We test which foods': 'Kami menguji makanan yang',
    'We test which foods spike blood sugar.': 'Kami menguji makanan yang memicu lonjakan gula darah.',
    'Wellness That Fits Daily Life.': 'ZFIT Harian.',
    'What Customers Keep Saying.': 'Kata Pelanggan.',
    'What we make': 'Yang kami buat',
    'WhatsApp: +62 858-4283-3973': 'WhatsApp: +62 858-4283-3973',
    'Why choose it': 'Mengapa memilih ini',
    'Why sucralose, not stevia or aspartame?': 'Mengapa Sukralosa?',
    'Works on formulation, testing, and the taste profile that makes ZERO easy to repeat.': 'Menangani formulasi, pengujian, dan profil rasa yang membuat ZERO mudah dikonsumsi berulang.',
    'Your ZERO Order': 'Pesanan ZERO Anda',
    'Your cart is empty. Add a ZERO product to start the order.': 'Keranjang Anda kosong. Tambahkan produk ZERO untuk mulai memesan.',
    'Your full name': 'Nama lengkap Anda',
    'Street, area, city, postal code': 'Jalan, area, kota, kode pos',
    'ZERO brand statements': 'Pernyataan brand ZERO',
    'ZERO daily habits': 'Kebiasaan harian ZERO',
    'Zero added. Nothing lost.': 'Nol tambahan. Tidak ada yang hilang.',
    'ZERO Drops | Portable Sugar-Free Sweetener Drops': 'ZERO Drops | Pemanis Tetes Portabel Bebas Gula',
    'ZERO Drops are made for customers who want sweetness within reach: compact enough to travel, concentrated enough to matter, and simple enough for daily use.': 'ZERO Drops dibuat untuk pelanggan yang ingin rasa manis selalu dekat: cukup ringkas untuk dibawa, cukup pekat untuk terasa, dan cukup sederhana untuk penggunaan harian.',
    'ZERO Drops bottle': 'Botol ZERO Drops',
    'ZERO Drops compact product page image': 'Gambar produk ZERO Drops ringkas',
    'ZERO Drops flavor drops image': 'Gambar rasa ZERO Drops',
    'ZERO Drops Go Anywhere.': 'ZERO Drops Portabel.',
    'ZERO Drops in Catalog': 'ZERO Drops di Katalog',
    'ZERO Drops product image': 'Gambar produk ZERO Drops',
    'ZERO Drops sweeten a drink with just 5 to 7 drops, giving customers a format that can travel anywhere.': 'ZERO Drops memaniskan minuman hanya dengan 5 sampai 7 tetes, memberi pelanggan format yang bisa dibawa ke mana saja.',
    'ZERO Facebook preview': 'Pratinjau Facebook ZERO',
    'ZERO Foods Indonesia | Sugar-Free Syrup, Drops & Toppings': 'ZERO Foods Indonesia | Syrup, Drops & Topping Bebas Gula',
    'ZERO Foods Indonesia builds syrups, drops, toppings, and wellness products for people who want less sugar without giving up flavor, convenience, or the routines they already enjoy.': 'ZERO Foods Indonesia membuat syrup, drops, topping, dan produk wellness untuk orang yang ingin mengurangi gula tanpa mengorbankan rasa, kemudahan, atau rutinitas yang sudah mereka nikmati.',
    'ZERO Foods Indonesia creates low-calorie syrups, drops, toppings, and wellness products for easier daily routines.': 'ZERO Foods Indonesia membuat syrup, drops, topping, dan produk wellness rendah kalori untuk rutinitas harian yang lebih mudah.',
    'ZERO Foods Indonesia location map': 'Peta lokasi ZERO Foods Indonesia',
    'ZERO Foods Indonesia makes sugar-free syrups, portable drops, maple topping, and ZFIT wellness products for smoother daily drinks and routines.': 'ZERO Foods Indonesia membuat syrup bebas gula, drops portabel, maple topping, dan produk wellness ZFIT untuk minuman serta rutinitas harian yang lebih nyaman.',
    'ZERO Foods Indonesia sells food and beverage products. Site content is for general product information only and should not be used to diagnose, treat, cure, or prevent any disease.': 'ZERO Foods Indonesia menjual produk makanan dan minuman. Konten situs hanya untuk informasi produk umum dan tidak boleh digunakan untuk mendiagnosis, merawat, menyembuhkan, atau mencegah penyakit apa pun.',
    'ZERO Home': 'Beranda ZERO',
    'ZERO Instagram preview': 'Pratinjau Instagram ZERO',
    'ZERO is built around easier sugar-free routines, but this page is not advertising copy. It is the disclaimer, ingredient context, and source trail for the decisions behind the product line.': 'ZERO dibangun untuk membuat rutinitas bebas gula lebih mudah, tetapi halaman ini bukan materi iklan. Ini adalah disclaimer, konteks bahan, dan jejak sumber di balik keputusan produk.',
    'ZERO is for customers who care about lower sugar, but will not keep using a product if the taste feels like punishment.': 'ZERO dibuat untuk pelanggan yang peduli pada gula lebih rendah, tetapi tidak akan terus memakai produk jika rasanya terasa seperti hukuman.',
    'ZERO is not nothing. ZERO is everything.': 'ZERO bukan kosong. ZERO adalah semuanya.',
    'ZERO Legal Info | Product Disclaimers & Sweetener References': 'Info Legal ZERO | Disclaimer Produk & Referensi Pemanis',
    'ZERO makes sugar-free syrup, drops, and toppings that taste smooth in coffee, refreshers, and daily drinks without the bitter aftertaste.': 'ZERO membuat syrup, drops, dan topping bebas gula dengan rasa halus di kopi, refresher, dan minuman harian tanpa aftertaste pahit.',
    'ZERO Maple Topping | Zero-Calorie Topping for Food': 'ZERO Maple Topping | Topping Nol Kalori untuk Makanan',
    'ZERO Maple Topping bottle': 'Botol ZERO Maple Topping',
    'ZERO Maple Topping online product image': 'Gambar produk online ZERO Maple Topping',
    'ZERO Maple Topping pour image': 'Gambar tuangan ZERO Maple Topping',
    'ZERO Maple Topping product image': 'Gambar produk ZERO Maple Topping',
    'ZERO MAPLE TOPPING for Food.': 'Maple Topping.',
    'ZERO operates from Sleman, Yogyakarta. Use the map for directions or contact the team before visiting.': 'ZERO beroperasi dari Sleman, Yogyakarta. Gunakan peta untuk petunjuk arah atau hubungi tim sebelum berkunjung.',
    'ZERO Product Catalog | Syrup, Drops, Maple Topping & ZFIT': 'Katalog Produk ZERO | Syrup, Drops, Maple Topping & ZFIT',
    'ZERO product lines': 'Lini produk ZERO',
    'ZERO runs fun food tests with a CGM, then explains the glucose chart, the spike, and why the curve looks the way it does.': 'ZERO menjalankan tes makanan yang ringan dan informatif dengan CGM, lalu menjelaskan grafik glukosa, lonjakannya, dan alasan bentuk kurvanya.',
    'ZERO Social | CGM Food Tests & Glucose Curve Explainers': 'ZERO Social | Tes Makanan CGM & Penjelasan Kurva Glukosa',
    'ZERO social media': 'Media sosial ZERO',
    'ZERO started from the everyday moments where sugar usually wins: morning coffee, iced drinks, pancakes, yogurt bowls, and quick drinks outside the house.': 'ZERO berawal dari momen sehari-hari ketika gula biasanya menang: kopi pagi, minuman dingin, pancake, yogurt bowl, dan minuman cepat di luar rumah.',
    'ZERO Syrup | Zero-Calorie Syrup for Coffee & Daily Drinks': 'ZERO Syrup | Sirup Nol Kalori untuk Kopi & Minuman Harian',
    'ZERO Syrup bottle': 'Botol ZERO Syrup',
    'ZERO Syrup bottle selection': 'Pilihan botol ZERO Syrup',
    'ZERO Syrup for Daily Drinks.': 'ZERO Syrup Harian.',
    'ZERO Syrup in Catalog': 'ZERO Syrup di Katalog',
    'ZERO Syrup is positioned as a smoother alternative to the bitter aftertaste many customers associate with stevia-based products.': 'ZERO Syrup diposisikan sebagai alternatif yang lebih halus dibanding aftertaste pahit yang sering diasosiasikan pelanggan dengan produk berbasis stevia.',
    'ZERO Syrup product bottles': 'Botol produk ZERO Syrup',
    'ZERO Syrup product lineup': 'Rangkaian produk ZERO Syrup',
    'ZERO Syrup vanilla bottle': 'Botol ZERO Syrup vanila',
    'ZERO TikTok preview': 'Pratinjau TikTok ZERO',
    'ZERO YouTube preview': 'Pratinjau YouTube ZERO',
    'Zero-calorie syrup for coffee, refreshers, and daily drinks with a smoother finish than stevia.': 'Sirup nol kalori untuk kopi, refresher, dan minuman harian dengan finish yang lebih halus daripada stevia.',
    'Zero-calorie syrup for coffee, refreshers, and repeat home use across the widest flavor range.': 'Sirup nol kalori untuk kopi, refresher, dan penggunaan rumah berulang dengan pilihan rasa paling luas.',
    'Zero-calorie syrup in 16 flavors and three bottle sizes, made for coffee, matcha, refreshers, mocktails, and repeat home or cafe use without adding sugar.': 'Sirup nol kalori dalam 16 rasa dan tiga ukuran botol, dibuat untuk kopi, matcha, refresher, mocktail, serta penggunaan berulang di rumah atau kafe tanpa tambahan gula.',
    'ZFit brings fiber syrup and ACVS into one focused wellness product range.': 'ZFit menghadirkan fiber syrup dan ACVS dalam satu rangkaian produk wellness yang fokus.',
    'ZFIT by ZERO | Fiber Syrup & Apple Cider Vinegar Syrup': 'ZFIT by ZERO | Fiber Syrup & Apple Cider Vinegar Syrup',
    'ZFIT expands beyond sweetness with prebiotic fiber syrup and ACVS for customers focused on overall wellness.': 'ZFIT melampaui rasa manis dengan prebiotic fiber syrup dan ACVS untuk pelanggan yang fokus pada wellness secara menyeluruh.',
    'ZFIT extends ZERO\'s easy-living approach into fiber syrup and ACVS, so health products can fit into coffee, water, and daily routines without ruining the taste.': 'ZFIT memperluas pendekatan easy-living ZERO ke fiber syrup dan ACVS, sehingga produk kesehatan bisa masuk ke kopi, air, dan rutinitas harian tanpa merusak rasa.',
    'ZFIT Fiber Syrup online product image': 'Gambar produk online ZFIT Fiber Syrup',
    'ZFIT Fiber Syrup product image': 'Gambar produk ZFIT Fiber Syrup',
    'ZFIT Fiber Syrup shop image': 'Gambar toko ZFIT Fiber Syrup',
    'ZFit keeps the ZERO standard: products should be easy to understand, easy to use, and simple to reorder when they become part of the day.': 'ZFit menjaga standar ZERO: produk harus mudah dipahami, mudah digunakan, dan mudah dipesan ulang saat sudah menjadi bagian dari rutinitas.',
    'ZFIT products': 'Produk ZFIT',
};

const textOriginals = new WeakMap();
const attributeOriginals = new WeakMap();
let currentLanguage = 'en';
let observer = null;
let titleOriginal = '';

const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const translateDateText = (dateText) => dateText
    .replace(/\bJanuary\b/g, 'Januari')
    .replace(/\bFebruary\b/g, 'Februari')
    .replace(/\bMarch\b/g, 'Maret')
    .replace(/\bApril\b/g, 'April')
    .replace(/\bMay\b/g, 'Mei')
    .replace(/\bJune\b/g, 'Juni')
    .replace(/\bJuly\b/g, 'Juli')
    .replace(/\bAugust\b/g, 'Agustus')
    .replace(/\bSeptember\b/g, 'September')
    .replace(/\bOctober\b/g, 'Oktober')
    .replace(/\bNovember\b/g, 'November')
    .replace(/\bDecember\b/g, 'Desember');

const translateProductLabel = (label, language) => label
    .split(' - ')
    .map((part) => translateText(part, language))
    .join(' - ');

export const translateText = (value, language = currentLanguage) => {
    const text = normalizeText(value);
    if (!text || language !== 'id') return text;

    if (ID_TRANSLATIONS[text]) return ID_TRANSLATIONS[text];

    const asOfMatch = text.match(/^As of (.+), ZERO leads Indonesia's zero-calorie syrup category\.$/);
    if (asOfMatch) {
        return `Per ${translateDateText(asOfMatch[1])}, ZERO memimpin kategori sirup nol kalori di Indonesia.`;
    }

    const unitsMatch = text.match(/^(.+) units sold in (\d{4})$/i);
    if (unitsMatch) {
        return `${unitsMatch[1]} unit terjual pada ${unitsMatch[2]}`;
    }

    const itemsMatch = text.match(/^(\d+) item(?:s)?$/i);
    if (itemsMatch) {
        return `${itemsMatch[1]} produk`;
    }

    const eachMatch = text.match(/^(Rp[\d.]+) each(?: . was (Rp[\d.]+))?$/);
    if (eachMatch) {
        return eachMatch[2]
            ? `${eachMatch[1]} per produk - sebelumnya ${eachMatch[2]}`
            : `${eachMatch[1]} per produk`;
    }

    const wasMatch = text.match(/^was (Rp[\d.]+)$/);
    if (wasMatch) {
        return `sebelumnya ${wasMatch[1]}`;
    }

    const removeMatch = text.match(/^Remove (.+) from cart$/);
    if (removeMatch) {
        return `Hapus ${translateProductLabel(removeMatch[1], language)} dari keranjang`;
    }

    const chooseMatch = text.match(/^Choose (.+)$/);
    if (chooseMatch) {
        return `Pilih ${translateProductLabel(chooseMatch[1], language)}`;
    }

    const unavailableMatch = text.match(/^(.+?) (Rp[\d.]+)( unavailable)?$/);
    if (unavailableMatch?.[3]) {
        return `${translateProductLabel(unavailableMatch[1], language)} ${unavailableMatch[2]} tidak tersedia`;
    }

    const previousMatch = text.match(/^Previous (.+) image$/);
    if (previousMatch) {
        return `Gambar ${translateText(previousMatch[1], language)} sebelumnya`;
    }

    const nextMatch = text.match(/^Next (.+) image$/);
    if (nextMatch) {
        return `Gambar ${translateText(nextMatch[1], language)} berikutnya`;
    }

    if (text.includes(' - ')) {
        const translated = translateProductLabel(text, language);
        if (translated !== text) return translated;
    }

    return text;
};

const shouldSkip = (node) => {
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return !element || Boolean(element.closest('script, style, noscript, [data-i18n-skip]'));
};

const getTextOriginal = (node) => {
    const current = normalizeText(node.nodeValue);
    const existing = textOriginals.get(node);
    if (!existing) {
        textOriginals.set(node, current);
        return current;
    }

    const translated = translateText(existing, 'id');
    if (current && current !== existing && current !== translated) {
        textOriginals.set(node, current);
        return current;
    }

    return existing;
};

const applyTextNode = (node) => {
    if (shouldSkip(node)) return;
    const raw = node.nodeValue || '';
    if (!/[A-Za-z]/.test(raw)) return;
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    const original = getTextOriginal(node);
    const translated = translateText(original, currentLanguage);
    const nextValue = `${leading}${translated}${trailing}`;
    if (node.nodeValue !== nextValue) {
        node.nodeValue = nextValue;
    }
};

const getAttributeOriginal = (element, attribute) => {
    let originals = attributeOriginals.get(element);
    if (!originals) {
        originals = new Map();
        attributeOriginals.set(element, originals);
    }

    const current = normalizeText(element.getAttribute(attribute));
    const existing = originals.get(attribute);
    if (!existing) {
        originals.set(attribute, current);
        return current;
    }

    const translated = translateText(existing, 'id');
    if (current && current !== existing && current !== translated) {
        originals.set(attribute, current);
        return current;
    }

    return existing;
};

const applyElementAttributes = (element) => {
    if (shouldSkip(element)) return;
    ['aria-label', 'alt', 'placeholder', 'title', 'content'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const original = getAttributeOriginal(element, attribute);
        const translated = translateText(original, currentLanguage);
        if (translated && translated !== element.getAttribute(attribute)) {
            element.setAttribute(attribute, translated);
        }
    });
};

export const translateFragment = (root = document) => {
    const scope = root.nodeType === Node.DOCUMENT_NODE ? root.documentElement : root;
    if (!scope) return;

    if (scope.nodeType === Node.TEXT_NODE) {
        applyTextNode(scope);
        return;
    }

    if (scope.nodeType === Node.ELEMENT_NODE) {
        applyElementAttributes(scope);
    }

    const textWalker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            return shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        },
    });

    while (textWalker.nextNode()) {
        applyTextNode(textWalker.currentNode);
    }

    const elements = scope.querySelectorAll?.('[aria-label], [alt], [placeholder], [title], meta[content]') || [];
    elements.forEach(applyElementAttributes);
};

const updateDocumentMetadata = () => {
    if (!titleOriginal) titleOriginal = document.title;
    const titleCurrent = normalizeText(document.title);
    const titleTranslated = translateText(titleOriginal, 'id');
    if (titleCurrent && titleCurrent !== titleOriginal && titleCurrent !== titleTranslated) {
        titleOriginal = titleCurrent;
    }
    document.title = translateText(titleOriginal, currentLanguage);
    document.documentElement.lang = currentLanguage === 'id' ? 'id' : 'en';
    document.documentElement.dataset.language = currentLanguage;
};

const getStoredLanguage = () => {
    try {
        if (localStorage.getItem(LANGUAGE_MANUAL_KEY) !== 'true') return null;
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return stored === 'id' || stored === 'en' ? stored : null;
    } catch {
        return null;
    }
};

const setStoredLanguage = (language, manual = false) => {
    if (!manual) return;
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        localStorage.setItem(LANGUAGE_MANUAL_KEY, 'true');
    } catch {
        // Language preferences are optional.
    }
};

const hasManualLanguage = () => {
    try {
        return localStorage.getItem(LANGUAGE_MANUAL_KEY) === 'true';
    } catch {
        return false;
    }
};

const isLikelyIndonesia = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language].filter(Boolean);

    return INDONESIA_TIME_ZONES.has(timeZone)
        || languages.some((language) => /^id(?:-|$)/i.test(language) || /-ID$/i.test(language));
};

const createLanguageToggle = () => {
    const existing = document.getElementById('zero-language-toggle');
    if (existing) return existing;

    const shell = document.createElement('div');
    shell.className = 'language-switch-shell';
    shell.setAttribute('data-i18n-skip', '');
    shell.innerHTML = `
        <button id="zero-language-toggle" class="language-toggle" type="button">
            <img src="${LANGUAGE_ICON_URL}" alt="" aria-hidden="true" width="18" height="18" loading="lazy">
            <span class="language-toggle-code">ID</span>
        </button>
    `;

    document.body.prepend(shell);

    const toggle = shell.querySelector('#zero-language-toggle');
    toggle?.addEventListener('click', () => {
        setZeroLanguage(currentLanguage === 'id' ? 'en' : 'id', { manual: true });
    });

    return toggle;
};

const updateLanguageToggle = () => {
    const toggle = document.getElementById('zero-language-toggle') || createLanguageToggle();
    const code = toggle?.querySelector('.language-toggle-code');
    const targetLanguage = currentLanguage === 'id' ? 'en' : 'id';
    if (code) code.textContent = targetLanguage.toUpperCase();
    if (!toggle) return;

    const label = targetLanguage === 'id'
        ? 'Switch language to Indonesian'
        : 'Switch language to English';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
};

export const setZeroLanguage = (language, { manual = false } = {}) => {
    const nextLanguage = language === 'id' ? 'id' : 'en';
    currentLanguage = nextLanguage;
    setStoredLanguage(nextLanguage, manual);
    updateDocumentMetadata();
    updateLanguageToggle();
    translateFragment(document);
    window.dispatchEvent(new CustomEvent('zero-language-change', {
        detail: { language: currentLanguage },
    }));
};

const refineLanguageFromCountry = async () => {
    if (hasManualLanguage()) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1600);

    try {
        const response = await fetch(COUNTRY_ENDPOINT, {
            signal: controller.signal,
            cache: 'no-store',
            credentials: 'omit',
        });
        if (!response.ok) return;
        const country = normalizeText(await response.text()).toUpperCase();
        if (country === 'ID') {
            setZeroLanguage('id');
        } else {
            setZeroLanguage('en');
        }
    } catch {
        // Keep the browser-based language guess if the country lookup is unavailable.
    } finally {
        window.clearTimeout(timeout);
    }
};

const observeDynamicContent = () => {
    if (observer || !document.body) return;
    observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => translateFragment(node));
                return;
            }

            if (mutation.type === 'characterData') {
                translateFragment(mutation.target);
                return;
            }

            if (mutation.type === 'attributes') {
                applyElementAttributes(mutation.target);
            }
        });
    });

    observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['aria-label', 'alt', 'placeholder', 'title'],
    });
};

export const getZeroLanguage = () => currentLanguage;

export const initZeroI18n = () => {
    createLanguageToggle();
    titleOriginal = document.title;
    const stored = getStoredLanguage();
    const initialLanguage = stored || (isLikelyIndonesia() ? 'id' : 'en');
    setZeroLanguage(initialLanguage);
    observeDynamicContent();
    refineLanguageFromCountry();
};
