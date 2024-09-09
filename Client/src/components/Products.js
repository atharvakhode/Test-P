const productList = [
    {
        prodid: 1,
        pname: "Cisco Router",
        brand: "Cisco",
        price: 15000,
        photo: "https://media.istockphoto.com/id/495732397/photo/black-wi-fi-router.jpg?s=612x612&w=0&k=20&c=KX1g5e0Fx48GZ_jIpSuUP1_jPkp6eAiJYFj2GYCzQoc="
    },
    {
        prodid: 2,
        pname: "Netgear Router",
        brand: "Netgear",
        price: 12000,
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQO9olW2JTmvIrl4JKUDsgFFeTLVlvnHzfnlV6oScKEw&s"
    },
    {
        prodid: 3,
        pname: "TP-Link Modem",
        brand: "TP-Link",
        price: 8000,
        photo: "https://t3.ftcdn.net/jpg/00/07/24/00/360_F_7240048_MLK859Q2OB4T1PqkuIcyHorsDHO2b57n.jpg"
    },
    {
        prodid: 4,
        pname: "D-Link Switch",
        brand: "D-Link",
        price: 6000,
        photo: "https://m.media-amazon.com/images/I/513wO6TEbnL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        prodid: 5,
        pname: "Linksys Extender",
        brand: "Linksys",
        price: 7000,
        photo: "https://m.media-amazon.com/images/I/513wO6TEbnL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        prodid: 6,
        pname: "Asus Router",
        brand: "Asus",
        price: 14000,
        photo: "https://media.istockphoto.com/id/495732397/photo/black-wi-fi-router.jpg?s=612x612&w=0&k=20&c=KX1g5e0Fx48GZ_jIpSuUP1_jPkp6eAiJYFj2GYCzQoc="
    },
    {
        prodid: 7,
        pname: "Huawei Modem",
        brand: "Huawei",
        price: 9000,
        photo: "https://m.media-amazon.com/images/I/513wO6TEbnL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        prodid: 8,
        pname: "ZTE Router",
        brand: "ZTE",
        price: 11000,
        photo: "https://media.istockphoto.com/id/495732397/photo/black-wi-fi-router.jpg?s=612x612&w=0&k=20&c=KX1g5e0Fx48GZ_jIpSuUP1_jPkp6eAiJYFj2GYCzQoc="
    },
    {
        prodid: 9,
        pname: "Belkin Extender",
        brand: "Belkin",
        price: 7500,
        photo: "https://m.media-amazon.com/images/I/513wO6TEbnL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        prodid: 10,
        pname: "Ubiquiti Access Point",
        brand: "Ubiquiti",
        price: 13000,
        photo: "https://m.media-amazon.com/images/I/513wO6TEbnL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        prodid: 11,
        pname: "Synology Router",
        brand: "Synology",
        price: 16000,
        photo: "https://media.istockphoto.com/id/495732397/photo/black-wi-fi-router.jpg?s=612x612&w=0&k=20&c=KX1g5e0Fx48GZ_jIpSuUP1_jPkp6eAiJYFj2GYCzQoc="
    },
    {
        prodid: 12,
        pname: "ARRIS Modem",
        brand: "ARRIS",
        price: 8500,
        photo: "https://motorolaus.vtexassets.com/arquivos/home-and-office-phone-cd402-family-image.png"
    },
    {
        prodid: 13,
        pname: "Motorola Modem",
        brand: "Motorola",
        price: 9500,
        photo: "https://motorolaus.vtexassets.com/arquivos/home-and-office-phone-cd402-family-image.png"
    },
    {
        prodid: 14,
        pname: "Mikrotik Router",
        brand: "Mikrotik",
        price: 12500,
        photo: "https://media.istockphoto.com/id/495732397/photo/black-wi-fi-router.jpg?s=612x612&w=0&k=20&c=KX1g5e0Fx48GZ_jIpSuUP1_jPkp6eAiJYFj2GYCzQoc="
    },
    {
        prodid: 15,
        pname: "Tenda Extender",
        brand: "Tenda",
        price: 6500,
        photo: "https://motorolaus.vtexassets.com/arquivos/home-and-office-phone-cd402-family-image.png"
    },
    {
        prodid: 16,
        pname: "DrayTek Router",
        brand: "DrayTek",
        price: 13500,
        photo: "https://media.istockphoto.com/id/495732397/photo/black-wi-fi-router.jpg?s=612x612&w=0&k=20&c=KX1g5e0Fx48GZ_jIpSuUP1_jPkp6eAiJYFj2GYCzQoc="
    },
    {
        prodid: 17,
        pname: "Netis Modem",
        brand: "Netis",
        price: 7000,
        photo: "https://t3.ftcdn.net/jpg/00/07/24/00/360_F_7240048_MLK859Q2OB4T1PqkuIcyHorsDHO2b57n.jpg"
    },
    {
        prodid: 18,
        pname: "Alcatel Modem",
        brand: "Alcatel",
        price: 8000,
        photo: "https://t3.ftcdn.net/jpg/00/07/24/00/360_F_7240048_MLK859Q2OB4T1PqkuIcyHorsDHO2b57n.jpg"
    },
    {
        prodid: 19,
        pname: "Zoom Modem",
        brand: "Zoom",
        price: 9000,
        photo: "https://t3.ftcdn.net/jpg/00/07/24/00/360_F_7240048_MLK859Q2OB4T1PqkuIcyHorsDHO2b57n.jpg"
    },
    {
        prodid: 20,
        pname: "Actiontec Extender",
        brand: "Actiontec",
        price: 7500,
        photo: "https://motorolaus.vtexassets.com/arquivos/home-and-office-phone-cd402-family-image.png"
    }
];