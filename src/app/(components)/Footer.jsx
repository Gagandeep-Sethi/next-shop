import Link from "next/link";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-gray-300 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link href="/" className="link link-hover">
            About us
          </Link>
          <Link href="/" className="link link-hover">
            Contact
          </Link>
          <Link href="/" className="link link-hover">
            Jobs
          </Link>
          <Link href="/" className="link link-hover">
            Press kit
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link href="/">
              <AiFillInstagram className="w-8 h-8" />
            </Link>

            <Link href="/">
              <AiFillInstagram className="w-8 h-8" />
            </Link>
            <Link href="/">
              <AiFillInstagram className="w-8 h-8" />
            </Link>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by ABCD Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
