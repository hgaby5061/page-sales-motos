import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mt-12 border-t border-gray-800 pt-8 pb-8 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} MotoElite. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
