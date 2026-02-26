import { useState, useEffect } from "react";

const parseProfile = (mdContent) => {
  const profile = {
    siteName: "",
    headerName: "",
    headerRole: "",
    headerDesc: "",
    about: "",
    contact: "",
    linkedin: "",
    github: "",
    email: "",
    logo: "",
  };

  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const section = line.substr(3).trim();

      switch (section) {
        case "Header":
          profile.headerName = lines[++i].substr(2).trim();
          profile.headerRole = lines[++i].substr(2).trim();
          profile.headerDesc = lines[++i].substr(2).trim();
          break;
        case "Site Name":
        case "SiteName":
        case "Name":
          profile.siteName = lines[++i].substr(2).trim();
          break;
        case "About":
          profile.about = lines[++i].trim();
          break;
        case "Contact":
          profile.contact = lines[++i].trim();
          const contactLinks = ["LinkedIn", "GitHub", "Email"];
          for (const link of contactLinks) {
            const linkLine = lines[++i].substr(2).trim();
            if (linkLine.startsWith(link)) {
              profile[link.toLowerCase()] = linkLine.split(": ")[1].trim();
            }
          }
          break;
        case "Logo":
          profile.logo = lines[++i].substr(2).trim();
          break;
        default:
          // do nothing
          break;
      }
    }
  }

  return profile;
};

const ProfileArray = () => {
  const [profile, setProfile] = useState({
    siteName: "Param Patel",
    headerName: "Param Patel",
    headerRole: "Generative AI Engineer + Full-Stack Builder",
    headerDesc: "I design multi-agent AI systems and performant web apps, from RAG chatbots to self-healing automation platforms.",
    about: "Motivated CS graduate student with hands-on experience building full-stack and generative AI systems. I focus on scalable backends, RAG pipelines, and automation workflows that deliver measurable impact.",
    contact: "Let's connect about AI systems, product engineering, or research collaborations.",
    linkedin: "https://www.linkedin.com/in/param-patel19/",
    github: "https://github.com/Param2k23",
    email: "paramkamleshku.patel@stonybrook.edu",
    logo: "PP",
  });

  useEffect(() => {
    fetch("/content/Profile.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setProfile(parseProfile(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return profile;
};

export default ProfileArray;
