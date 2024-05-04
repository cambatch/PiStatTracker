const ranks = [
    { name: "recruit", minXP: 0 },
    { name: "cadet_Bronze_I", minXP: 100 },
    { name: "cadet_Bronze_II", minXP: 1100 },
    { name: "cadet_Bronze_III", minXP: 2350 },
    { name: "private_Bronze_I", minXP: 3850 },
    { name: "private_Bronze_II", minXP: 4850 },
    { name: "private_Bronze_III", minXP: 6100 },
    { name: "lance_corporal_Bronze_I", minXP: 7850 },
    { name: "lance_corporal_Bronze_II", minXP: 9100 },
    { name: "lance_corporal_Bronze_III", minXP: 10600 },
    { name: "corporal_Bronze_I", minXP: 12350 },
    { name: "corporal_Bronze_II", minXP: 13600 },
    { name: "corporal_Bronze_III", minXP: 15100 },
    { name: "sergeant_Bronze_I", minXP: 17100 },
    { name: "sergeant_Bronze_II", minXP: 18600 },
    { name: "sergeant_Bronze_III", minXP: 20350 },
    { name: "staff_sergeant_Bronze_I", minXP: 22600 },
    { name: "staff_sergeant_Bronze_II", minXP: 24100 },
    { name: "staff_sergeant_Bronze_III", minXP: 25850 },
    { name: "gunnery_sergeant_Bronze_I", minXP: 28350 },
    { name: "gunnery_sergeant_Bronze_II", minXP: 30100 },
    { name: "gunnery_sergeant_Bronze_III", minXP: 32100 },
    { name: "master_sergeant_Bronze_I", minXP: 34850 },
    { name: "master_sergeant_Bronze_II", minXP: 36600 },
    { name: "master_sergeant_Bronze_III", minXP: 38850 },
    { name: "lieutenant_Bronze_I", minXP: 41850 },
    { name: "lieutenant_Bronze_II", minXP: 43850 },
    { name: "lieutenant_Bronze_III", minXP: 46350 },
    { name: "captain_Bronze_I", minXP: 49600 },
    { name: "captain_Bronze_II", minXP: 51850 },
    { name: "captain_Bronze_III", minXP: 54600 },
    { name: "major_Bronze_I", minXP: 58100 },
    { name: "major_Bronze_II", minXP: 60600 },
    { name: "major_Bronze_III", minXP: 63600 },
    { name: "lt_colonel_Bronze_I", minXP: 67350 },
    { name: "lt_colonel_Bronze_II", minXP: 70100 },
    { name: "lt_colonel_Bronze_III", minXP: 73350 },
    { name: "colonel_Bronze_I", minXP: 77350 },
    { name: "colonel_Bronze_II", minXP: 80350 },
    { name: "colonel_Bronze_III", minXP: 83850 },
    { name: "brigadier_general_Bronze_I", minXP: 88350 },
    { name: "brigadier_general_Bronze_II", minXP: 91600 },
    { name: "brigadier_general_Bronze_III", minXP: 95350 },
    { name: "general_Bronze_I", minXP: 100350 },
    { name: "general_Bronze_II", minXP: 103850 },
    { name: "general_Bronze_III", minXP: 107850 },
    { name: "cadet_Silver_I", minXP: 113100 },
    { name: "cadet_Silver_II", minXP: 115350 },
    { name: "cadet_Silver_III", minXP: 117850 },
    { name: "private_Silver_I", minXP: 121100 },
    { name: "private_Silver_II", minXP: 123350 },
    { name: "private_Silver_III", minXP: 126100 },
    { name: "lance_corporal_Silver_I", minXP: 129850 },
    { name: "lance_corporal_Silver_II", minXP: 132350 },
    { name: "lance_corporal_Silver_III", minXP: 135350 },
    { name: "corporal_Silver_I", minXP: 139350 },
    { name: "corporal_Silver_II", minXP: 142100 },
    { name: "corporal_Silver_III", minXP: 145350 },
    { name: "sergeant_Silver_I", minXP: 149600 },
    { name: "sergeant_Silver_II", minXP: 152600 },
    { name: "sergeant_Silver_III", minXP: 156350 },
    { name: "staff_sergeant_Silver_I", minXP: 161100 },
    { name: "staff_sergeant_Silver_II", minXP: 164350 },
    { name: "staff_sergeant_Silver_III", minXP: 168350 },
    { name: "gunnery_sergeant_Silver_I", minXP: 173600 },
    { name: "gunnery_sergeant_Silver_II", minXP: 177350 },
    { name: "gunnery_sergeant_Silver_III", minXP: 181600 },
    { name: "master_sergeant_Silver_I", minXP: 187350 },
    { name: "master_sergeant_Silver_II", minXP: 191350 },
    { name: "master_sergeant_Silver_III", minXP: 196100 },
    { name: "lieutenant_Silver_I", minXP: 202350 },
    { name: "lieutenant_Silver_II", minXP: 206600 },
    { name: "lieutenant_Silver_III", minXP: 211850 },
    { name: "captain_Silver_I", minXP: 218600 },
    { name: "captain_Silver_II", minXP: 223350 },
    { name: "captain_Silver_III", minXP: 229100 },
    { name: "major_Silver_I", minXP: 236350 },
    { name: "major_Silver_II", minXP: 241600 },
    { name: "major_Silver_III", minXP: 247850 },
    { name: "lt_colonel_Silver_I", minXP: 255850 },
    { name: "lt_colonel_Silver_II", minXP: 261600 },
    { name: "lt_colonel_Silver_III", minXP: 268350 },
    { name: "colonel_Silver_I", minXP: 277100 },
    { name: "colonel_Silver_II", minXP: 283350 },
    { name: "colonel_Silver_III", minXP: 290850 },
    { name: "brigadier_general_Silver_I", minXP: 300350 },
    { name: "brigadier_general_Silver_II", minXP: 307100 },
    { name: "brigadier_general_Silver_III", minXP: 315100 },
    { name: "general_Silver_I", minXP: 325100 },
    { name: "general_Silver_II", minXP: 332350 },
    { name: "general_Silver_III", minXP: 341100 },
    { name: "cadet_Gold_I", minXP: 353600 },
    { name: "cadet_Gold_II", minXP: 358100 },
    { name: "cadet_Gold_III", minXP: 363600 },
    { name: "private_Gold_I", minXP: 370850 },
    { name: "private_Gold_II", minXP: 375850 },
    { name: "private_Gold_III", minXP: 381850 },
    { name: "lance_corporal_Gold_I", minXP: 389600 },
    { name: "lance_corporal_Gold_II", minXP: 395100 },
    { name: "lance_corporal_Gold_III", minXP: 401600 },
    { name: "corporal_Gold_I", minXP: 410100 },
    { name: "corporal_Gold_II", minXP: 416100 },
    { name: "corporal_Gold_III", minXP: 423350 },
    { name: "sergeant_Gold_I", minXP: 432600 },
    { name: "sergeant_Gold_II", minXP: 439100 },
    { name: "sergeant_Gold_III", minXP: 446850 },
    { name: "staff_sergeant_Gold_I", minXP: 456850 },
    { name: "staff_sergeant_Gold_II", minXP: 463850 },
    { name: "staff_sergeant_Gold_III", minXP: 472350 },
    { name: "gunnery_sergeant_Gold_I", minXP: 482350 },
    { name: "gunnery_sergeant_Gold_II", minXP: 490100 },
    { name: "gunnery_sergeant_Gold_III", minXP: 499350 },
    { name: "master_sergeant_Gold_I", minXP: 511850 },
    { name: "master_sergeant_Gold_II", minXP: 520350 },
    { name: "master_sergeant_Gold_III", minXP: 530350 },
    { name: "lieutenant_Gold_I", minXP: 542850 },
    { name: "lieutenant_Gold_II", minXP: 552100 },
    { name: "lieutenant_Gold_III", minXP: 562100 },
    { name: "captain_Gold_I", minXP: 577100 },
    { name: "captain_Gold_II", minXP: 587100 },
    { name: "captain_Gold_III", minXP: 599600 },
    { name: "major_Gold_I", minXP: 614600 },
    { name: "major_Gold_II", minXP: 624600 },
    { name: "major_Gold_III", minXP: 637100 },
    { name: "lt_colonel_Gold_I", minXP: 654600 },
    { name: "lt_colonel_Gold_II", minXP: 667100 },
    { name: "lt_colonel_Gold_III", minXP: 682100 },
    { name: "colonel_Gold_I", minXP: 702100 },
    { name: "colonel_Gold_II", minXP: 714600 },
    { name: "colonel_Gold_III", minXP: 729600 },
    { name: "brigadier_general_Gold_I", minXP: 749600 },
    { name: "brigadier_general_Gold_II", minXP: 764600 },
    { name: "brigadier_general_Gold_III", minXP: 782100 },
    { name: "general_Gold_I", minXP: 804600 },
    { name: "general_Gold_II", minXP: 819600 },
    { name: "general_Gold_III", minXP: 839600 },
    { name: "cadet_Platinum_I", minXP: 864600 },
    { name: "cadet_Platinum_II", minXP: 874350 },
    { name: "cadet_Platinum_III", minXP: 886850 },
    { name: "private_Platinum_I", minXP: 901850 },
    { name: "private_Platinum_II", minXP: 911850 },
    { name: "private_Platinum_III", minXP: 924350 },
    { name: "lance_corporal_Platinum_I", minXP: 941850 },
    { name: "lance_corporal_Platinum_II", minXP: 954350 },
    { name: "lance_corporal_Platinum_III", minXP: 969350 },
    { name: "corporal_Platinum_I", minXP: 986850 },
    { name: "corporal_Platinum_II", minXP: 999350 },
    { name: "corporal_Platinum_III", minXP: 1012350 },
    { name: "corporal_Platinum_II", minXP: 999350 },
    { name: "corporal_Platinum_III", minXP: 1014350 },
    { name: "sergeant_Platinum_I", minXP: 1034350 },
    { name: "sergeant_Platinum_II", minXP: 1049350 },
    { name: "sergeant_Platinum_III", minXP: 1066850 },
    { name: "staff_sergeant_Platinum_I", minXP: 1089350 },
    { name: "staff_sergeant_Platinum_II", minXP: 1104350 },
    { name: "staff_sergeant_Platinum_III", minXP: 1121850 },
    { name: "gunnery_sergeant_Platinum_I", minXP: 1144350 },
    { name: "gunnery_sergeant_Platinum_II", minXP: 1161850 },
    { name: "gunnery_sergeant_Platinum_III", minXP: 1181850 },
    { name: "master_sergeant_Platinum_I", minXP: 1206850 },
    { name: "master_sergeant_Platinum_II", minXP: 1224350 },
    { name: "master_sergeant_Platinum_III", minXP: 1246850 },
    { name: "lieutenant_Platinum_I", minXP: 1274350 },
    { name: "lieutenant_Platinum_II", minXP: 1294350 },
    { name: "lieutenant_Platinum_III", minXP: 1319350 },
    { name: "captain_Platinum_I", minXP: 1349350 },
    { name: "captain_Platinum_II", minXP: 1371850 },
    { name: "captain_Platinum_III", minXP: 1396850 },
    { name: "major_Platinum_I", minXP: 1429350 },
    { name: "major_Platinum_II", minXP: 1451850 },
    { name: "major_Platinum_III", minXP: 1479350 },
    { name: "lt_colonel_Platinum_I", minXP: 1516850 },
    { name: "lt_colonel_Platinum_II", minXP: 1541850 },
    { name: "lt_colonel_Platinum_III", minXP: 1571850 },
    { name: "colonel_Platinum_I", minXP: 1611850 },
    { name: "colonel_Platinum_II", minXP: 1639350 },
    { name: "colonel_Platinum_III", minXP: 1674350 },
    { name: "brigadier_general_Platinum_I", minXP: 1719350 },
    { name: "brigadier_general_Platinum_II", minXP: 1749350 },
    { name: "brigadier_general_Platinum_III", minXP: 1786850 },
    { name: "general_Platinum_I", minXP: 1834350 },
    { name: "general_Platinum_II", minXP: 1866850 },
    { name: "general_Platinum_III", minXP: 1906850 },
    { name: "cadet_Diamond_I", minXP: 1959350 },
    { name: "cadet_Diamond_II", minXP: 1979350 },
    { name: "cadet_Diamond_III", minXP: 2004350 },
    { name: "private_Diamond_I", minXP: 2036850 },
    { name: "private_Diamond_II", minXP: 2059350 },
    { name: "private_Diamond_III", minXP: 2086850 },
    { name: "lance_corporal_Diamond_I", minXP: 2121850 },
    { name: "lance_corporal_Diamond_II", minXP: 2146850 },
    { name: "lance_corporal_Diamond_III", minXP: 2176850 },
    { name: "corporal_Diamond_I", minXP: 2216850 },
    { name: "corporal_Diamond_II", minXP: 2244350 },
    { name: "corporal_Diamond_III", minXP: 2276850 },
    { name: "sergeant_Diamond_I", minXP: 2319350 },
    { name: "sergeant_Diamond_II", minXP: 2349350 },
    { name: "sergeant_Diamond_III", minXP: 2384350 },
    { name: "staff_sergeant_Diamond_I", minXP: 2431850 },
    { name: "staff_sergeant_Diamond_II", minXP: 2464350 },
    { name: "staff_sergeant_Diamond_III", minXP: 2504350 },
    { name: "gunnery_sergeant_Diamond_I", minXP: 2554350 },
    { name: "gunnery_sergeant_Diamond_II", minXP: 2589350 },
    { name: "gunnery_sergeant_Diamond_III", minXP: 2631850 },
    { name: "master_sergeant_Diamond_I", minXP: 2686850 },
    { name: "master_sergeant_Diamond_II", minXP: 2726850 },
    { name: "master_sergeant_Diamond_III", minXP: 2774350 },
    { name: "lieutenant_Diamond_I", minXP: 2834350 },
    { name: "lieutenant_Diamond_II", minXP: 2876850 },
    { name: "lieutenant_Diamond_III", minXP: 2926850 },
    { name: "captain_Diamond_I", minXP: 2991850 },
    { name: "captain_Diamond_II", minXP: 3039350 },
    { name: "captain_Diamond_III", minXP: 3094350 },
    { name: "major_Diamond_I", minXP: 3166850 },
    { name: "major_Diamond_II", minXP: 3216850 },
    { name: "major_Diamond_III", minXP: 3276850 },
    { name: "lt_colonel_Diamond_I", minXP: 3356850 },
    { name: "lt_colonel_Diamond_II", minXP: 3411850 },
    { name: "lt_colonel_Diamond_III", minXP: 3476850 },
    { name: "colonel_Diamond_I", minXP: 3561850 },
    { name: "colonel_Diamond_II", minXP: 3621850 },
    { name: "colonel_Diamond_III", minXP: 3694350 },
    { name: "brigadier_general_Diamond_I", minXP: 3789350 },
    { name: "brigadier_general_Diamond_II", minXP: 3854350 },
    { name: "brigadier_general_Diamond_III", minXP: 3934350 },
    { name: "general_Diamond_I", minXP: 4034350 },
    { name: "general_Diamond_II", minXP: 4106850 },
    { name: "general_Diamond_III", minXP: 4191850 },
    { name: "cadet_Onyx_I", minXP: 4291850 },
    { name: "cadet_Onyx_II", minXP: 4336850 },
    { name: "cadet_Onyx_III", minXP: 4391850 },
    { name: "private_Onyx_I", minXP: 4461850 },
    { name: "private_Onyx_II", minXP: 4511850 },
    { name: "private_Onyx_III", minXP: 4569350 },
    { name: "lance_corporal_Onyx_I", minXP: 4646850 },
    { name: "lance_corporal_Onyx_II", minXP: 4699350 },
    { name: "lance_corporal_Onyx_III", minXP: 4764350 },
    { name: "corporal_Onyx_I", minXP: 4846850 },
    { name: "corporal_Onyx_II", minXP: 4904350 },
    { name: "corporal_Onyx_III", minXP: 4974350 },
    { name: "sergeant_Onyx_I", minXP: 5064350 },
    { name: "sergeant_Onyx_II", minXP: 5126850 },
    { name: "sergeant_Onyx_III", minXP: 5204350 },
    { name: "staff_sergeant_Onyx_I", minXP: 5304350 },
    { name: "staff_sergeant_Onyx_II", minXP: 5374350 },
    { name: "staff_sergeant_Onyx_III", minXP: 5456850 },
    { name: "gunnery_sergeant_Onyx_I", minXP: 5556850 },
    { name: "gunnery_sergeant_Onyx_II", minXP: 5631850 },
    { name: "gunnery_sergeant_Onyx_III", minXP: 5721850 },
    { name: "master_sergeant_Onyx_I", minXP: 5846850 },
    { name: "master_sergeant_Onyx_II", minXP: 5929350 },
    { name: "master_sergeant_Onyx_III", minXP: 6029350 },
    { name: "lieutenant_Onyx_I", minXP: 6154350 },
    { name: "lieutenant_Onyx_II", minXP: 6244350 },
    { name: "lieutenant_Onyx_III", minXP: 6344350 },
    { name: "captain_Onyx_I", minXP: 6494350 },
    { name: "captain_Onyx_II", minXP: 6594350 },
    { name: "captain_Onyx_III", minXP: 6719350 },
    { name: "major_Onyx_I", minXP: 6869350 },
    { name: "major_Onyx_II", minXP: 6969350 },
    { name: "major_Onyx_III", minXP: 7094350 },
    { name: "lt_colonel_Onyx_I", minXP: 7269350 },
    { name: "lt_colonel_Onyx_II", minXP: 7394350 },
    { name: "lt_colonel_Onyx_III", minXP: 7544350 },
    { name: "colonel_Onyx_I", minXP: 7719350 },
    { name: "colonel_Onyx_II", minXP: 7844350 },
    { name: "colonel_Onyx_III", minXP: 7994350 },
    { name: "brigadier_general_Onyx_I", minXP: 8194350 },
    { name: "brigadier_general_Onyx_II", minXP: 8344350 },
    { name: "brigadier_general_Onyx_III", minXP: 8519350 },
    { name: "general_Onyx_I", minXP: 8744350 },
    { name: "general_Onyx_II", minXP: 8894350 },
    { name: "general_Onyx_III", minXP: 9069350 },
    { name: "hero", minXP: 9319351 }
]
export default ranks;