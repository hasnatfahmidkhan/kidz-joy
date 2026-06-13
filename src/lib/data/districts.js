// All Bangladesh districts
// Dhaka district → ৳60 shipping
// All others     → ৳120 shipping

export const SHIPPING_COST = {
  DHAKA:   60,
  OUTSIDE: 120,
};

export const districts = [
  // ── Dhaka Division ──
  { name: "Dhaka",        division: "Dhaka"    },
  { name: "Gazipur",      division: "Dhaka"    },
  { name: "Narayanganj",  division: "Dhaka"    },
  { name: "Manikganj",    division: "Dhaka"    },
  { name: "Munshiganj",   division: "Dhaka"    },
  { name: "Narsingdi",    division: "Dhaka"    },
  { name: "Tangail",      division: "Dhaka"    },
  { name: "Kishoreganj",  division: "Dhaka"    },
  { name: "Netrokona",    division: "Dhaka"    },
  { name: "Faridpur",     division: "Dhaka"    },
  { name: "Gopalganj",    division: "Dhaka"    },
  { name: "Madaripur",    division: "Dhaka"    },
  { name: "Rajbari",      division: "Dhaka"    },
  { name: "Shariatpur",   division: "Dhaka"    },

  // ── Chittagong Division ──
  { name: "Chittagong",   division: "Chittagong" },
  { name: "Cox's Bazar",  division: "Chittagong" },
  { name: "Comilla",      division: "Chittagong" },
  { name: "Feni",         division: "Chittagong" },
  { name: "Brahmanbaria", division: "Chittagong" },
  { name: "Rangamati",    division: "Chittagong" },
  { name: "Noakhali",     division: "Chittagong" },
  { name: "Chandpur",     division: "Chittagong" },
  { name: "Lakshmipur",   division: "Chittagong" },
  { name: "Khagrachhari", division: "Chittagong" },
  { name: "Bandarban",    division: "Chittagong" },

  // ── Rajshahi Division ──
  { name: "Rajshahi",     division: "Rajshahi" },
  { name: "Bogura",       division: "Rajshahi" },
  { name: "Pabna",        division: "Rajshahi" },
  { name: "Natore",       division: "Rajshahi" },
  { name: "Naogaon",      division: "Rajshahi" },
  { name: "Sirajganj",    division: "Rajshahi" },
  { name: "Joypurhat",    division: "Rajshahi" },
  { name: "Chapainawabganj", division: "Rajshahi" },

  // ── Khulna Division ──
  { name: "Khulna",       division: "Khulna" },
  { name: "Bagerhat",     division: "Khulna" },
  { name: "Satkhira",     division: "Khulna" },
  { name: "Jessore",      division: "Khulna" },
  { name: "Magura",       division: "Khulna" },
  { name: "Jhenaidah",    division: "Khulna" },
  { name: "Narail",       division: "Khulna" },
  { name: "Kushtia",      division: "Khulna" },
  { name: "Chuadanga",    division: "Khulna" },
  { name: "Meherpur",     division: "Khulna" },

  // ── Barishal Division ──
  { name: "Barishal",     division: "Barishal" },
  { name: "Bhola",        division: "Barishal" },
  { name: "Patuakhali",   division: "Barishal" },
  { name: "Pirojpur",     division: "Barishal" },
  { name: "Barguna",      division: "Barishal" },
  { name: "Jhalokati",    division: "Barishal" },

  // ── Sylhet Division ──
  { name: "Sylhet",       division: "Sylhet" },
  { name: "Moulvibazar",  division: "Sylhet" },
  { name: "Habiganj",     division: "Sylhet" },
  { name: "Sunamganj",    division: "Sylhet" },

  // ── Rangpur Division ──
  { name: "Rangpur",      division: "Rangpur" },
  { name: "Dinajpur",     division: "Rangpur" },
  { name: "Gaibandha",    division: "Rangpur" },
  { name: "Kurigram",     division: "Rangpur" },
  { name: "Lalmonirhat",  division: "Rangpur" },
  { name: "Nilphamari",   division: "Rangpur" },
  { name: "Panchagarh",   division: "Rangpur" },
  { name: "Thakurgaon",   division: "Rangpur" },

  // ── Mymensingh Division ──
  { name: "Mymensingh",   division: "Mymensingh" },
  { name: "Jamalpur",     division: "Mymensingh" },
  { name: "Sherpur",      division: "Mymensingh" },
  { name: "Netrokona",    division: "Mymensingh" },
];

// ── Helper: get shipping cost by district name ──
export const getShippingCost = (districtName) => {
  const district = districts.find(
    (d) => d.name.toLowerCase() === districtName.toLowerCase()
  );

  if (!district) return SHIPPING_COST.OUTSIDE;

  return district.name === "Dhaka"
    ? SHIPPING_COST.DHAKA
    : SHIPPING_COST.OUTSIDE;
};