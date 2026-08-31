import { CURRENT_CLUB_YEAR, PREVIOUS_CLUB_YEAR, type ClubYear } from "./academic-year"

export type TeamMember = {
  id: number
  name: string
  role: string
  usn: string
  image: string
  social: {
    instagram: string
    linkedin?: string
    github?: string
  }
}

export const TEAM_BY_YEAR: Record<ClubYear, TeamMember[]> = {
  [CURRENT_CLUB_YEAR]: [
    {
      id: 1,
      name: "Avinash Shetty",
      role: "President",
      usn: "NNM23AC008",
      image: "/team/26-27/avinash-shetty.webp",
      social: {
        instagram: "https://www.instagram.com/shetty_avinash_28",
        linkedin: "https://www.linkedin.com/in/avinash-shetty-7a17b734a",
        github: "https://github.com/Avinash-Shetty2006",
      },
    },
    {
      id: 2,
      name: "Siddharth R",
      role: "Vice President",
      usn: "NNM24AC049",
      image: "/team/26-27/siddharth-r.webp",
      social: {
        instagram: "https://www.instagram.com/Si_dharthh",
        linkedin: "https://www.linkedin.com/in/siddharth-r-105782305?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
        github: "https://github.com/Siddharth1968",
      },
    },
    {
      id: 3,
      name: "Bhavish Kumar M",
      role: "Secretary",
      usn: "NNM24AC011",
      image: "/team/26-27/bhavish-kumar-m.webp",
      social: {
        instagram: "https://www.instagram.com/bhavissshhhh",
        linkedin: "https://www.linkedin.com/in/bhavish-kumar-m-27a3243a0",
      },
    },
    {
      id: 4,
      name: "Manvith H L",
      role: "Treasurer",
      usn: "NNM24AC027",
      image: "/team/26-27/manvith-h-l.webp",
      social: {
        instagram: "https://www.instagram.com/h_l_manvith?igsi=MXEycGhha2k3dTB0YQ==",
        linkedin: "https://in.linkedin.com/in/manvithlokesh",
      },
    },
    {
      id: 5,
      name: "Deepthi R",
      role: "Joint Treasurer",
      usn: "NN25ACT013",
      image: "/team/26-27/deepthi-r.webp",
      social: {
        instagram: "https://www.instagram.com/_deepthir.jogi_27",
        linkedin: "#",
      },
    },
    {
      id: 6,
      name: "Chandana Marathe",
      role: "Cultural Co-Head",
      usn: "NN25ACT010",
      image: "/team/26-27/chandana-marathe.webp",
      social: {
        instagram: "https://www.instagram.com/chandanamarathe",
        linkedin: "#",
      },
    },
    {
      id: 7,
      name: "Adwaith H U", 
      role: "Branch Captain",
      usn: "NNM23AC002",
      image: "/team/nnm23ac002.JPG",
      social: {
        instagram: "https://www.instagram.com/adwaith.hu?igsh=c21weWEwMm01ZzJq",
        linkedin: "https://www.linkedin.com/in/adwaithhu/",
      },
    },
    {
      id: 8,
      name: "Anish Kumar",
      role: "Technical Head",
      usn: "NNM24AC008",
      image: "/team/26-27/anish-kumar.webp",
      social: {
        instagram: "https://www.instagram.com/anish_kumar1006/",
        linkedin: "https://www.linkedin.com/in/anish-kumar-1a5bb133a/",
        github: "https://github.com/iotserver24",
      },
    },
    {
      id: 9,
      name: "Glen Christen Tauro",
      role: "Technical Co-Head",
      usn: "NN25ACT018",
      image: "/team/26-27/glen-christen-tauro.webp",
      social: {
        instagram: "https://www.instagram.com/glen_tauro?igsh=MXdrbnZ2dHA0OTRkbA==&igsi=MXdrbnZ2dHA0OTRkbA==",
        linkedin: "https://www.linkedin.com/in/glen-tauro-a81355378?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        github: "https://github.com/GlenTauro",
      },
    },
    {
      id: 10,
      name: "Siddharth Pai K",
      role: "Joint Secretary",
      usn: "NN25ACT056",
      image: "/team/26-27/siddharth-pai-k.webp",
      social: {
        instagram: "https://www.instagram.com/paisiddu07?utm_source=qr&igsi=MXdkZjM4ZzJlb3NrdA==",
        linkedin: "https://www.linkedin.com/in/k-siddharth-pai-5454b7379?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    },
    {
      id: 11,
      name: "Manish",
      role: "Event Management Head",
      usn: "NNM24AC025",
      image: "/team/26-27/manish.webp",
      social: {
        instagram: "https://www.instagram.com/manish__achar_?igsi=dm1uaTZyZWxodDF0",
        linkedin: "https://www.linkedin.com/in/manish-achar?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    },
    {
      id: 12,
      name: "Manvi Shetty",
      role: "Event Management Co-Head",
      usn: "NN25ACT030",
      image: "/team/26-27/manvi-shetty.webp",
      social: {
        instagram: "https://www.instagram.com/manvi.shettyy",
        linkedin: "#",
      },
    },
    {
      id: 13,
      name: "Vibhav Kamat",
      role: "Social Media Team",
      usn: "NN25ACT066",
      image: "/team/26-27/vibhav-kamat.webp",
      social: {
        instagram: "https://www.instagram.com/vibhav_kamat",
        linkedin: "#",
      },
    },
    {
      id: 14,
      name: "Hithesh P M",
      role: "Sports Head",
      usn: "NNM24AC019",
      image: "/team/26-27/hithesh-p-m.webp",
      social: {
        instagram: "https://www.instagram.com/_hithesh_polya",
        linkedin: "https://www.linkedin.com/in/hithesh-polya-3847a6361?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      },
    },
    {
      id: 15,
      name: "Manvith",
      role: "Social Media Head",
      usn: "NNM24AC026",
      image: "/team/26-27/manvith-social-media.webp",
      social: {
        instagram: "https://www.instagram.com/manvithh_?igsi=YzZ3eGJ5bGwzZGpm",
        linkedin: "https://www.linkedin.com/in/manvith1320?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    },
    {
      id: 16,
      name: "Ashlesh Acharya",
      role: "Cultural Head",
      usn: "NNM24AC010",
      image: "/team/nnm24ac010.jpg",
      social: {
        instagram: "https://www.instagram.com/_ashuacharya_?utm_source=qr&igsi=em03NG5wdDNqZjYz",
        linkedin: "https://www.linkedin.com/in/ashleshacharya?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    },
    {
      id: 17,
      name: "Gowthami",
      role: "Sports Co-Head",
      usn: "NN25ACT019",
      image: "/team/26-27/gowthami.webp",
      social: {
        instagram: "#",
        linkedin: "https://www.linkedin.com/in/gowthami-poojari-7ab7a3429?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    },
    {
      id: 18,
      name: "Shereen Melora Agera",
      role: "Social Media Team",
      usn: "NN25ACT051",
      image: "/team/26-27/shereen-melora-agera.webp",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
  ],
  [PREVIOUS_CLUB_YEAR]: [
    {
      id: 1,
      name: "Adwaith H U",
      role: "President",
      usn: "NNM23AC002",
      image: "/team/nnm23ac002.JPG",
      social: {
        instagram: "https://www.instagram.com/adwaith.hu?igsh=c21weWEwMm01ZzJq",
        linkedin: "https://www.linkedin.com/in/adwaithhu/",
      },
    },
    {
      id: 2,
      name: "Pratham",
      role: "Vice President",
      usn: "NNM23AC043",
      image: "/team/nnm23ac043.JPG",
      social: {
        instagram: "https://www.instagram.com/prath.dev?igsh=a29vcmVhNmd1aGN0",
        linkedin: "https://www.linkedin.com/in/pratham-devadiga-115bbb358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 3,
      name: "Aishwarya Hegde",
      role: "Secretary",
      usn: "NNM23AC003",
      image: "/team/nnm23ac003.JPG",
      social: {
        instagram: "https://www.instagram.com/aishu_hegde2545?igsh=N2R0c2xrbXB5Nms5",
        linkedin: "https://www.linkedin.com/in/aishwarya-hegde-4910a8298",
      },
    },
    {
      id: 4,
      name: "Adarsh Acharya",
      role: "Joint Secretary",
      usn: "NNM24AC001",
      image: "/team/nnm24ac001.png",
      social: {
        instagram: "https://www.instagram.com/_acharya_adarsh_?igsh=M3ZmcDk4eGI3aWtt",
        linkedin: "https://www.linkedin.com/in/adarsh-acharya-693253290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 5,
      name: "Deekshith H Poojary",
      role: "Branch Captain",
      usn: "NNM23AC017",
      image: "/team/nnm23ac017.JPG",
      social: {
        instagram: "https://www.instagram.com/deekshithhpoojary_?igsh=dThza2phNTVwdmtv",
        linkedin: "https://www.linkedin.com/in/deekshith-poojary-148a49295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 6,
      name: "Mohammed Ibrahim Zahi",
      role: "Treasurer",
      usn: "NNM23AC035",
      image: "/team/nnm23ac035.png",
      social: {
        instagram: "https://www.instagram.com/_ibrahimzahi?utm_source=qr&igsh=MXVpMTF0MHMza3dtNg==",
        linkedin: "https://www.linkedin.com/in/mohammed-ibrahim-zahi-1a77b1291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 7,
      name: "Sonal Hegde",
      role: "Joint Treasurer",
      usn: "NNM24AC050",
      image: "/team/nnm24ac050.jpeg",
      social: {
        instagram: "https://www.instagram.com/_sonalhegde?igsh=MW54d2NmbnA0dGxtcQ%3D%3D&utm_source=qr",
        linkedin: "https://www.linkedin.com/in/sonalhegde?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
    },
    {
      id: 8,
      name: "Dhanushree",
      role: "Cultural Head",
      usn: "NNM23AC019",
      image: "/team/nnm23ac019.JPG",
      social: {
        instagram: "https://www.instagram.com/kamath_dhanushree24?igsh=NnNyejV2b3l6NXQ5",
        linkedin: "https://www.linkedin.com/in/dhanushree-kamath-a92053291",
      },
    },
    {
      id: 9,
      name: "Chittha Shetty",
      role: "Cultural Co-Head",
      usn: "NNM24AC012",
      image: "/team/nnm24ac012.jpg",
      social: {
        instagram: "https://www.instagram.com/chittha_shetty?igsh=MXFuMDJmZzViaXk0NQ==",
        linkedin: "https://www.linkedin.com/in/chittha-shetty-bb645b380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 10,
      name: "Chinmay Shetty",
      role: "Event Management Head",
      usn: "NNM23AC011",
      image: "/team/nnm23ac012.JPG",
      social: {
        instagram: "https://www.instagram.com/i.chinn.x?igsh=MXRvMGo4ODRtMnd4bw==",
        linkedin: "https://www.linkedin.com/in/chinmay-shetty-u-786a15254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 11,
      name: "Kavana Kori",
      role: "Event Management Co-Head",
      usn: "NNM24AC021",
      image: "/team/nnm24ac021.jpg",
      social: {
        instagram: "https://www.instagram.com/kavana_kori?igsh=NG11emd5bzZqMXdq",
        linkedin: "https://www.linkedin.com/in/kori-kavana-3863b8376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 12,
      name: "Nidish Shetty",
      role: "Sports Head",
      usn: "NNM23AC040",
      image: "/team/nnm23ac040.JPG",
      social: {
        instagram: "https://www.instagram.com/shetty.nidhish18?utm_source=qr&igsh=MTRubnhldGxpcWh1eQ==",
        linkedin: "https://www.linkedin.com/in/nidhish-shetty-21968b356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 13,
      name: "Hithesh P M",
      role: "Sports Co-Head",
      usn: "NNM24AC019",
      image: "/team/nnm24ac019.jpg",
      social: {
        instagram: "https://www.instagram.com/_hithesh_polya?igsh=MXN3NXBsd2xvejZrOA==",
        linkedin: "#",
      },
    },
    {
      id: 14,
      name: "Mohammed Farhan Riaz",
      role: "Technical Head",
      usn: "NNM23AC034",
      image: "/team/nnm23ac034.png",
      social: {
        instagram: "https://www.instagram.com/farhanriaz15/?next=%2F&hl=en",
        linkedin: "https://www.linkedin.com/in/farhan-riaz/",
        github: "https://github.com/farhanriaz15",
      },
    },
    {
      id: 15,
      name: "Anish Kumar",
      role: "Technical Co-Head",
      usn: "NNM24AC008",
      image: "/team/nnm24ac008.jpg",
      social: {
        instagram: "https://www.instagram.com/anish_kumar1006/",
        linkedin: "https://www.linkedin.com/in/anish-kumar-1a5bb133a/",
        github: "https://github.com/iotserver24",
      },
    },
    {
      id: 16,
      name: "Akash K M",
      role: "Social Media Head",
      usn: "NNM23AC004",
      image: "/team/nnm23ac004.JPG",
      social: {
        instagram: "https://www.instagram.com/akashh_elukoti?utm_source=qr&igsh=MzV5ZTNucXNmYjR2",
        linkedin: "https://www.linkedin.com/in/akash-k-m-b81737349",
      },
    },
    {
      id: 17,
      name: "Manvith",
      role: "Social Media Coordinator",
      usn: "NNM24AC026",
      image: "/team/nnm24ac019.png",
      social: {
        instagram: "https://www.instagram.com/manvithh_?utm_source=qr&igsh=YzZ3eGJ5bGwzZGpm",
        linkedin: "https://www.linkedin.com/in/manvith-m-44233737a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 18,
      name: "Manish",
      role: "Social Media Coordinator",
      usn: "NNM24AC025",
      image: "/team/nnm24ac025.png",
      social: {
        instagram: "https://www.instagram.com/manish__achar_?igsh=dm1uaTZyZWxodDF0",
        linkedin: "https://www.linkedin.com/in/manish-achar-23a8a635a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 19,
      name: "Darshan Sadashivanagouda Linganagoudra",
      role: "Class Representative (5th Sem)",
      usn: "NNM23AC016",
      image: "/team/nnm23ac016.png",
      social: {
        instagram: "https://www.instagram.com/darshan.s.linganagoudra?igsh=dHF5ZXc0bm9zc2hk",
        linkedin: "https://www.linkedin.com/in/darshan-sadashivanagouda-linganagoudra-220367311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 20,
      name: "Ashlesh N Acharya",
      role: "Class Representative (3rd Sem)",
      usn: "NNM24AC010",
      image: "/team/nnm24ac010.jpg",
      social: {
        instagram: "https://www.instagram.com/_ashuacharya_?igsh=em03NG5wdDNqZjYz",
        linkedin: "#",
      },
    },
    {
      id: 21,
      name: "Jevin Lesten Dsouza",
      role: "1st Year CR",
      usn: "NU25T23",
      image: "/team/nu25t23.png",
      social: {
        instagram: "https://www.instagram.com/jevin.dsouza?igsh=YzhoZWd5dnpmeWR6&utm_source=qr",
        linkedin: "https://www.linkedin.com/in/jevin-undefined-973344304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
    },
  ],
}
