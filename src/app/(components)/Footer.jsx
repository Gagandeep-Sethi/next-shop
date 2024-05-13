import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-gray-300 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link href="/aboutus" className="link link-hover">
            About us
          </Link>
          <Link
            href="mailto:gagandeepsethi.7895@gmail.com"
            className="link link-hover"
          >
            Contact
          </Link>
          <Link href="/termsandconditions" className="link link-hover">
            Terms & Conditions
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link
              href="https://www.linkedin.com/in/gagandeep-sethi-560796206/"
              target="_blank"
            >
              <FaLinkedin className="w-8 h-8" />
            </Link>

            <Link href="https://github.com/gagandeep-sethi" target="_blank">
              <FaGithub className="w-8 h-8" />
            </Link>
            <Link href="mailto:gagandeepsethi.7895@gmail.com">
              <SiGmail className="w-8 h-8" />
            </Link>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by SKY Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
