import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  return (
    <div className="flex justify-between items-center">
      <Input
        className="w-full rounded-2xl"
        type="text"
        placeholder="Find what you are looking for..."
      />
      <Button className="p-2 ml-2 w-fit h-fit rounded-full" variant="outline">
        <SearchIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};
