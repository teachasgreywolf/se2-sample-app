/**
 * teachasgreywolf
 * May 2, 2024
 */

import { Input } from "@/shadcn/ui/input";
import { router } from "@inertiajs/react";
import { CircleX } from "lucide-react";

export default function SearchInput({
    className = "",
    search,
    onSearchChanged,
    onLoading,
    onSearchSubmit,
    route,
}) {
    return (
        <div className="flex relative w-full">
            <Input
                id="search"
                name="search"
                value={search}
                type="text"
                placeholder="Search"
                className={
                    "md:w-96 pb-1 pl-4 rounded-full border-gray-400 pr-7 text-base " +
                    className
                }
                onChange={(e) => onSearchChanged(e)}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        onLoading();
                        onSearchSubmit(e);
                    }
                }}
            />

            {search && (
                <CircleX
                    className="absolute right-2 top-1 w-4 cursor-pointer"
                    onClick={(e) => {
                        onLoading();
                        router.get(route);
                    }}
                />
            )}
        </div>
    );
}
