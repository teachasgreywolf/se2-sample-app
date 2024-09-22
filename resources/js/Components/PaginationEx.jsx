/**
 * teachasgreywolf
 * April 25, 2024
 */

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/shadcn/ui/pagination";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

const PaginationEx = ({ links, meta, onLoading }) => {
    return (
        <div className="flex w-full">
            <div className="absolute hidden md:flex">
                <div>
                    <span className="text-sm mx-1">from</span>
                    {meta?.from ?? 0}
                </div>
                <div>
                    <span className="mx-1 text-sm">to</span>
                    {meta?.to ?? 0}
                </div>
                <div>
                    <span className="mx-1 text-sm">of</span>
                    {meta?.total ?? 0}
                </div>
                <div>
                    <span className="mx-1 text-sm">records</span>
                </div>
            </div>
            <Pagination>
                <PaginationContent className="flex space-x-5">
                    {links?.prev ? (
                        <PaginationLink href={links?.first} title="First page">
                            <ChevronsLeft
                                onClick={onLoading}
                                className="w-[31.5px]"
                            />
                        </PaginationLink>
                    ) : (
                        <ChevronsLeft className="cursor-not-allowed w-[31.5px]" />
                    )}

                    {links?.prev ? (
                        <PaginationLink
                            href={links?.prev}
                            title="Previous page"
                        >
                            <ChevronLeft
                                onClick={onLoading}
                                className="w-[31.5px]"
                            />
                        </PaginationLink>
                    ) : (
                        <ChevronLeft className="cursor-not-allowed w-[31.5px]" />
                    )}

                    <PaginationItem>
                        <div className="text-sm">
                            <span>page </span>
                            <span>{meta?.current_page ?? 1}</span>
                            <span> of </span>
                            {meta?.last_page ?? 1}
                        </div>
                    </PaginationItem>

                    {links?.next ? (
                        <PaginationLink href={links?.next} title="Next page">
                            <ChevronRight
                                onClick={onLoading}
                                className="w-[31.5px]"
                            />
                        </PaginationLink>
                    ) : (
                        <ChevronRight className="cursor-not-allowed w-[31.5px]" />
                    )}

                    {links?.next ? (
                        <PaginationLink href={links?.last} title="Lage page">
                            <ChevronsRight
                                onClick={onLoading}
                                className="w-[31.5px]"
                            />
                        </PaginationLink>
                    ) : (
                        <ChevronsRight className="cursor-not-allowed w-[31.5px]" />
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationEx;
