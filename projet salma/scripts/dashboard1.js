// scripts/dashboard1.js


let currencyRates = {
    '€': 1, // EUR is the base currency
    '$': null, // USD rate will be fetched
    'MAD': null // MAD rate will be fetched
};

// Fct de fetch real-time
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR'); // remplacement avec un API réel
        const data = await response.json();
        currencyRates['$'] = data.rates.USD; // mise à jour USD 
        currencyRates['MAD'] = data.rates.MAD; // mise à jour MAD 
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
    }
}

// Fct de mise à jour des KPI 
function updateKPICurrency(currency) {
    const rate = currencyRates[currency];
    const totalSalesElement = document.getElementById('totalSales');
    const totalSalesValue = 26300; // Original value in EUR

    // traduction
    const lang = document.documentElement.lang || 'fr';
    const currencySymbols = {
        fr: { '€': '€', '$': '$', 'MAD': 'DH' },
        en: { '€': '€', '$': '$', 'MAD': 'DH' },
        ar: { '€': '€', '$': '$', 'MAD': 'د.م.' }
    };
    const currencySymbol = currencySymbols[lang][currency] || currency;

    // mise à jour du total des ventes
    totalSalesElement.textContent = `${(totalSalesValue * rate).toLocaleString()} ${currencySymbol}`;

    
}

// fct d'ititialisation des dropdown
function initializeCurrency() {
    const currencySelect = document.getElementById('currencySelect');
    const savedCurrency = localStorage.getItem('selectedCurrency') || '€';

    
    currencySelect.value = savedCurrency;

    // màj de veleur kpi
    updateKPICurrency(savedCurrency);

    // Event listener des changements
    currencySelect.addEventListener('change', function () {
        const selectedCurrency = this.value;
        localStorage.setItem('selectedCurrency', selectedCurrency); // Save the selected currency
        updateKPICurrency(selectedCurrency);
    });
}

// initialisation de la fct main 
document.addEventListener("DOMContentLoaded", async () => {
    // Load the selected language from localStorage on page load
    const savedLang = localStorage.getItem('selectedLanguage') || 'fr';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(savedLang);
    initializeCharts(savedLang);

    // Fetch real-time exchange rates
    await fetchExchangeRates();

    // Initialize the currency dropdown and KPI values
    initializeCurrency();
});

// traduction du dashboard 
const translations = {
    fr: {
        menuTitle: 'Menu',
        homeLink: 'Accueil',
        dashboardLink: 'Dashboard',
        productsLink: 'Produits',
        ordersLink: 'Commandes',
        suppliersLink: 'Fournisseurs',
        reportsLink: 'Rapports',
        settingsLink: 'Paramètres',
        createUserLink: 'Créer un utilisateur',
        viewUsersLink: 'Voir les utilisateurs',
        dashboardTitle: 'Tableau de Bord',
        totalSalesTitle: 'Ventes Totales',
        totalOrdersTitle: 'Commandes',
        avgPerformanceTitle: 'Performance',
        weeklySalesTitle: 'Ventes Hebdomadaires',
        topProductsTitle: 'Top Produits (Stock)',
        storePerformanceTitle: 'Performance par Magasin',
        salesGrowthTitle: 'Croissance des Ventes (En Ligne vs En Magasin)',
        staffPerformanceTitle: 'Performance du Personnel',
        logoutButton: 'Déconnexion',
        // titres des graphs 
        completedLabel: 'Complété',
        pendingLabel: 'En attente',
        canceledLabel: 'Annulé',
        revenueLabel: 'Revenu',
        usersLabel: 'Utilisateurs',
        salesLabel: 'Ventes',
        northLabel: 'Casa Maarif',
        southLabel: 'Casa Derb Sultan',
        eastLabel: 'Tétouan',
        rabatLabel: 'Rabat Akkari',
        onlineLabel: 'En ligne',
        inStoreLabel: 'En magasin',
        // titres KPI
        totalSalesKPI: 'Ventes Totales',
        totalOrdersKPI: 'Commandes',
        avgPerformanceKPI: 'Performance',
        growthLabel: '+12% vs dernière période',
        conversionRateLabel: '85% taux de conversion',
        objectiveLabel: 'Objectif: 80%',
        // mois
        jan: 'Jan',
        feb: 'Fév',
        mar: 'Mar',
        apr: 'Avr',
        may: 'Mai',
        // noms des produits
        jean: 'Jean',
        robe: 'Robe',
        tricot: 'Tricot',
        manteau: 'Manteau',
        top: 'Top',
        accessoire: 'Accessoire',
        // transition actuelle
        eurLabel: 'EUR (€)',
        usdLabel: 'USD ($)',
        madLabel: 'MAD (DH)'
    },
    en: {
        menuTitle: 'Menu',
        homeLink: 'Home',
        dashboardLink: 'Dashboard',
        productsLink: 'Products',
        ordersLink: 'Orders',
        suppliersLink: 'Suppliers',
        reportsLink: 'Reports',
        settingsLink: 'Settings',
        createUserLink: 'Create User',
        viewUsersLink: 'View Users',
        dashboardTitle: 'Dashboard',
        totalSalesTitle: 'Total Sales',
        totalOrdersTitle: 'Orders',
        avgPerformanceTitle: 'Performance',
        weeklySalesTitle: 'Weekly Sales',
        topProductsTitle: 'Top Products (Stock)',
        storePerformanceTitle: 'Store Performance',
        salesGrowthTitle: 'Sales Growth (Online vs In-Store)',
        staffPerformanceTitle: 'Staff Performance',
        logoutButton: 'Logout',
        // titres des graphs
        completedLabel: 'Completed',
        pendingLabel: 'Pending',
        canceledLabel: 'Canceled',
        revenueLabel: 'Revenue',
        usersLabel: 'Users',
        salesLabel: 'Sales',
        northLabel: 'Casa Maarif',
        southLabel: 'Casa Derb Sultan',
        eastLabel: 'Tetouan',
        rabatLabel: 'Rabat Akkari',
        onlineLabel: 'Online',
        inStoreLabel: 'In Store',
        // titres KPI
        totalSalesKPI: 'Total Sales',
        totalOrdersKPI: 'Orders',
        avgPerformanceKPI: 'Performance',
        growthLabel: '+12% vs last period',
        conversionRateLabel: '85% conversion rate',
        objectiveLabel: 'Goal: 80%',
        // mois
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        // nom des produits
        jean: 'Jeans',
        robe: 'Dress',
        tricot: 'Sweater',
        manteau: 'Coat',
        top: 'Top',
        accessoire: 'Accessory',
        // traduction
        eurLabel: 'EUR (€)',
        usdLabel: 'USD ($)',
        madLabel: 'MAD (DH)'
    },
    ar: {
        menuTitle: 'القائمة',
        homeLink: 'الصفحة الرئيسية',
        dashboardLink: 'لوحة التحكم',
        productsLink: 'المنتجات',
        ordersLink: 'الطلبات',
        suppliersLink: 'الموردين',
        reportsLink: 'التقارير',
        settingsLink: 'الإعدادات',
        createUserLink: 'إنشاء مستخدم',
        viewUsersLink: 'عرض المستخدمين',
        dashboardTitle: 'لوحة التحكم',
        totalSalesTitle: 'إجمالي المبيعات',
        totalOrdersTitle: 'الطلبات',
        avgPerformanceTitle: 'الأداء',
        weeklySalesTitle: 'المبيعات الأسبوعية',
        topProductsTitle: 'أفضل المنتجات (المخزون)',
        storePerformanceTitle: 'أداء المتجر',
        salesGrowthTitle: 'نمو المبيعات (عبر الإنترنت مقابل في المتجر)',
        staffPerformanceTitle: 'أداء الموظفين',
        logoutButton: 'تسجيل الخروج',
        // titres Graph
        completedLabel: 'مكتمل',
        pendingLabel: 'قيد الانتظار',
        canceledLabel: 'ملغى',
        revenueLabel: 'الإيرادات',
        usersLabel: 'المستخدمين',
        salesLabel: 'المبيعات',
        northLabel: 'كازا معاريف',
        southLabel: 'كازا درب سلطان',
        eastLabel: 'تطوان',
        rabatLabel: 'الرباط عكاري',
        onlineLabel: 'عبر الإنترنت',
        inStoreLabel: 'في المتجر',
        // titres KPI
        totalSalesKPI: 'إجمالي المبيعات',
        totalOrdersKPI: 'الطلبات',
        avgPerformanceKPI: 'الأداء',
        growthLabel: '+12% مقابل الفترة السابقة',
        conversionRateLabel: '85% معدل التحويل',
        objectiveLabel: 'الهدف: 80%',
        // Mois
        jan: 'يناير',
        feb: 'فبراير',
        mar: 'مارس',
        apr: 'أبريل',
        may: 'مايو',
        // nom Produits
        jean: 'جينز',
        robe: 'فستان',
        tricot: 'سترة',
        manteau: 'معطف',
        top: 'توب',
        accessoire: 'إكسسوار',
        // transition
        eurLabel: 'يورو (€)',
        usdLabel: 'دولار ($)',
        madLabel: 'درهم مغربي (د.م.)'
    }
};

// Apply translations
function applyTranslations(lang) {
    const translation = translations[lang];
    for (const [key, value] of Object.entries(translation)) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value;
        }
    }

    // màj  des titres KPI
    document.getElementById('totalSalesTitle').textContent = translation.totalSalesKPI;
    document.getElementById('totalOrdersTitle').textContent = translation.totalOrdersKPI;
    document.getElementById('avgPerformanceTitle').textContent = translation.avgPerformanceKPI;
    document.getElementById('growthLabel').textContent = translation.growthLabel;
    document.getElementById('conversionRateLabel').textContent = translation.conversionRateLabel;
    document.getElementById('objectiveLabel').textContent = translation.objectiveLabel;

    // màj dropdown options
    const currencySelect = document.getElementById('currencySelect');
    if (currencySelect) {
        currencySelect.innerHTML = `
            <option value="€">${translation.eurLabel}</option>
            <option value="$">${translation.usdLabel}</option>
            <option value="MAD">${translation.madLabel}</option>
        `;
    }
}

// initialisation charts 
function initializeCharts(lang) {
    const translation = translations[lang];

    // Weekly Sales Chart (Line)
    const weeklySalesCtx = document.getElementById("weeklySalesChart").getContext("2d");
    new Chart(weeklySalesCtx, {
        type: "line",
        data: {
            labels: [translation.jan, translation.feb, translation.mar, translation.apr, translation.may], // Translated months
            datasets: [
                {
                    label: translation.salesLabel,
                    data: [1000, 2500, 3500, 5000, 7450],
                    borderColor: "#E879F9",
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    // Top Products Chart (Bar) - Updated to show top products by stock size
    const topProductsCtx = document.getElementById("topProductsChart").getContext("2d");
    const topProductsChart = new Chart(topProductsCtx, {
        type: "bar",
        data: {
            labels: [], // Product names will be dynamically added
            datasets: [
                {
                    label: translation.stock,
                    data: [], // Stock sizes will be dynamically added
                    backgroundColor: ["#60A5FA", "#F59E0B", "#10B981"], // Colors for top 3 products
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: translation.stock,
                    },
                },
            },
        },
    });

    // fct de màj du stock selon le stock actuel 
    function updateTopProductsChart() {
        const products = JSON.parse(localStorage.getItem('products')) || [];

        // filtre ascen
        const sortedProducts = products.sort((a, b) => a.stock - b.stock);

        // select 3 top sales
        const topProducts = sortedProducts.slice(0, 3);

        // Extract product names and stock sizes
        const productNames = topProducts.map(product => translation[product.nom.toLowerCase()] || product.nom); // Get translated product names
        const productStocks = topProducts.map(product => product.stock); // Get stock sizes

        // màj si ya un màj
        if (
            JSON.stringify(topProductsChart.data.labels) !== JSON.stringify(productNames) ||
            JSON.stringify(topProductsChart.data.datasets[0].data) !== JSON.stringify(productStocks)
        ) {
            topProductsChart.data.labels = productNames;
            topProductsChart.data.datasets[0].data = productStocks;
            topProductsChart.update();
        }
    }

    // Update the chart every 5 seconds (real-time simulation)
    updateTopProductsChart(); // Initial update
    setInterval(updateTopProductsChart, 5000); // Periodic updates

    // Store Performance Chart (Bar) - Removed FAR
    const storePerformanceCtx = document.getElementById("storePerformanceChart").getContext("2d");
    new Chart(storePerformanceCtx, {
        type: "bar",
        data: {
            labels: [translation.northLabel, translation.southLabel, translation.eastLabel, translation.rabatLabel],
            datasets: [
                {
                    label: translation.salesLabel,
                    data: [300, 200, 150, 250], // Sales data for Casa Maarif, Casa Derb Sultan, Tetouan, Rabat Akkari
                    backgroundColor: ["#60A5FA", "#F59E0B", "#10B981", "#8B5CF6"],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    // Sales Growth Chart (Line)
    const salesGrowthCtx = document.getElementById("salesGrowthChart").getContext("2d");
    new Chart(salesGrowthCtx, {
        type: "line",
        data: {
            labels: [translation.jan, translation.feb, translation.mar, translation.apr, translation.may], // Translated months
            datasets: [
                {
                    label: translation.onlineLabel,
                    data: [1000, 2500, 3500, 5000, 7450],
                    borderColor: "#E879F9",
                    fill: false,
                },
                {
                    label: translation.inStoreLabel,
                    data: [500, 1500, 2500, 4000, 6000],
                    borderColor: "#60A5FA",
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    // Staff Performance Chart (Doughnut)
    const staffPerformanceCtx = document.getElementById("staffPerformanceChart").getContext("2d");
    new Chart(staffPerformanceCtx, {
        type: "doughnut",
        data: {
            labels: [translation.completedLabel, translation.pendingLabel, translation.canceledLabel],
            datasets: [
                {
                    data: [50, 30, 20],
                    backgroundColor: ["#10B981", "#FBBF24", "#F87171"],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });
}