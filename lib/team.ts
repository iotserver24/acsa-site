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
  [CURRENT_CLUB_YEAR]: [],
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
