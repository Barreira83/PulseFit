import "./Footer.scss";

const Footer = () => {
  const staff = [
    {
      name: "Luis Díaz",
      linkedin: "https://www.linkedin.com/in/luisdiazvazquez/",
    },
    {
      name: "Ángel Ares",
      linkedin: "https://www.linkedin.com/in/%C3%A1ngel-a-b05205286/",
    },
    {
      name: "Patricia Lojo",
      linkedin: "https://www.linkedin.com/in/patricia-lojo-zubeldia/",
    },
    {
      name: "David Barreira",
      linkedin: "https://www.linkedin.com/in/david-barreira-suarez/",
    },
  ];
  return (
    <div className="footer">
      <p>
        ©{" "}
        {staff.map((member, index) => (
          <a
            key={index}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {member.name}
          </a>
        ))}
      </p>
    </div>
  );
};

export default Footer;
