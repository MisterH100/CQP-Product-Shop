"use client";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useGlobalContext } from "@/lib/global_context";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export const Search = ({ textValue }: { textValue?: string }) => {
  const { setSelected } = useGlobalContext();
  const [value, setValue] = useState(textValue);
  const pathname = usePathname();
  const sanitizeString = (str: string) => {
    return str.replace(/\s+/g, " ").toLowerCase();
  };
  return (
    <div className="relative flex justify-between items-center">
      <Input
        className="w-full rounded-2xl"
        type="text"
        value={value}
        onChange={(e) => setValue(sanitizeString(e.target.value))}
        placeholder="Find what you are looking for..."
      />
      {typeof value != "undefined" && value != "" && (
        <Button
          onClick={() => setValue("")}
          variant="ghost"
          className="absolute right-16 rounded-full"
        >
          <XIcon className=" w-4 h-4" />
        </Button>
      )}

      <Link
        onClick={() => setSelected("")}
        href={
          typeof value != "undefined" && value != ""
            ? "/search/" + value.replace(/\s+/g, "")
            : pathname
        }
        className={` ${buttonVariants({
          variant: "outline",
        })} p-2 ml-2 w-fit h-fit rounded-full`}
      >
        <SearchIcon className="w-6 h-6" />
      </Link>
    </div>
  );
};
