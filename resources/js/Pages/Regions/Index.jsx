/**
 * teachasgreywolf
 * May 17, 2024
 */

import PaginationEx from "@/Components/PaginationEx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SearchInput from "@/Components/SearchInput";
import Create from "./Create";
import Update from "./Update";
import Show from "./Show";
import dayjs from "dayjs";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { titleCase } from "@/lib/util";
import { cn } from "@/shadcn/lib/utils";
import {
    Eye,
    Loader2,
    MoveDown,
    MoveUp,
    MoveVertical,
    Pencil,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import { Separator } from "@/shadcn/ui/separator";
import { useToast } from "@/shadcn/hooks/use-toast";

export default function Index({ auth, model, queryParams = null }) {
    queryParams = queryParams || {};

    const resourceName = "region";
    const { toast } = useToast();
    const { flash } = usePage().props;
    const [search, setSearch] = useState(queryParams.search || "");
    const [loading, setLoading] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        open: false,
        process: "",
        data: null,
    });

    const onSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route("regions.index"), {
            search: search,
            sort_field: "created_at",
            sort_direction: "desc",
        });
    };

    const onSearchChanged = (e) => {
        setSearch(e.target.value);
        queryParams.search = e.target.value;
    };

    const onLoading = (e) => {
        setLoading(true);
    };

    const onDialogConfig = (config) => {
        if (!config) {
            setDialogConfig({
                open: false,
                process: "",
                data: null,
            });
        } else {
            setDialogConfig(config);
        }
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("regions.index"), { ...queryParams });
    };

    useEffect(() => {
        if (flash?.message) {
            toast({
                className: cn(
                    "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
                ),
                description: flash.message,
            });

            flash.message = "";
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {titleCase(resourceName)}
                </h2>
            }
        >
            <Head title={titleCase(resourceName)} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="md:flex justify-between mb-6">
                                <div className="relative flex items-center">
                                    <SearchInput
                                        search={search}
                                        onSearchChanged={onSearchChanged}
                                        onLoading={onLoading}
                                        onSearchSubmit={onSearchSubmit}
                                        route={route("regions.index", {
                                            sort_field: "created_at",
                                            sort_direction: "desc",
                                        })}
                                    />

                                    {loading && (
                                        <Loader2 className="absolute -right-16 w-10 animate-spin" />
                                    )}
                                </div>

                                <Create resourceName={resourceName} />
                            </div>

                            <div className="rounded shadow">
                                <div className="relative p-3 dark:bg-gray-600 bg-gray-200 rounded-tl-lg rounded-tr-lg flex items-center">
                                    <PaginationEx
                                        links={model.links}
                                        meta={model.meta}
                                        onLoading={onLoading}
                                    />
                                </div>

                                <table className="border-collapse table-auto w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th
                                                onClick={(e) => {
                                                    onLoading();
                                                    sortChanged("name");
                                                }}
                                                className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left"
                                            >
                                                {/* prettier-ignore */}
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    Name

                                                    {queryParams.sort_field === "name"
                                                        ? (queryParams.sort_direction === "asc"
                                                            ? (<MoveUp className="w-4" />)
                                                            : (<MoveDown className="w-4" />))
                                                        : (<MoveVertical className="w-4" />)
                                                    }
                                                </div>
                                            </th>

                                            <th className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                                                Description
                                            </th>

                                            <th className="border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                                                Created By
                                            </th>

                                            <th
                                                onClick={(e) => {
                                                    onLoading();
                                                    sortChanged("created_at");
                                                }}
                                                className="w-[1%] whitespace-nowrap min-w-36 border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left"
                                            >
                                                {/* prettier-ignore */}
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    Date Created

                                                    {queryParams.sort_field === "created_at"
                                                        ? (queryParams.sort_direction === "asc"
                                                            ? (<MoveUp className="w-4" />)
                                                            : (<MoveDown className="w-4" />))
                                                        : (<MoveVertical className="w-4" />)
                                                    }
                                                </div>
                                            </th>

                                            <th className="w-[1%] whitespace-nowrap border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white dark:bg-slate-800">
                                        {model.data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                    {item.name}
                                                </td>

                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                    {item.description}
                                                </td>

                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                    {item.createdBy.name}
                                                </td>

                                                {/* prettier-ignore */}
                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                    {dayjs(item.createdAt).format("MMMM D, YYYY")}
                                                </td>

                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                    <div className="flex space-x-2">
                                                        <div className="text-center cursor-pointer hover:bg-slate-400 hover:text-black hover:rounded-xl p-1">
                                                            {/* prettier-ignore */}
                                                            <div
                                                                className="text-[7px]"
                                                                onClick={() => {
                                                                    setDialogConfig({
                                                                        open: true,
                                                                        process: "view",
                                                                        data: item,
                                                                    });
                                                                }}
                                                            >
                                                                <Eye className="border rounded-full px-1 text-blue-600 border-blue-600" />

                                                                View
                                                            </div>
                                                        </div>

                                                        <div className="text-center cursor-pointer hover:bg-slate-400 hover:text-black hover:rounded-xl p-1">
                                                            {/* prettier-ignore */}
                                                            <div
                                                                className="text-[7px]"
                                                                onClick={() => {
                                                                    setDialogConfig({
                                                                        open: true,
                                                                        process: "update",
                                                                        data: item,
                                                                    });
                                                                }}
                                                            >
                                                                <Pencil className="border rounded-full px-1 text-green-600 border-green-600" />

                                                                Update
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="relative p-3 dark:bg-gray-600 bg-gray-200 rounded-bl-lg rounded-br-lg flex items-center">
                                    <PaginationEx
                                        links={model.links}
                                        meta={model.meta}
                                        onLoading={onLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog open={dialogConfig.open} onOpenChange={onDialogConfig}>
                    <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none">
                        <DialogHeader>
                            {/* prettier-ignore */}
                            <DialogTitle>
                                {titleCase(dialogConfig.process + " " + resourceName)}
                            </DialogTitle>
                        </DialogHeader>

                        <Separator className="h-[1px] mb-4 bg-slate-500" />

                        {dialogConfig.process === "view" && (
                            <Show
                                model={dialogConfig.data}
                                onDialogConfig={onDialogConfig}
                            />
                        )}

                        {dialogConfig.process === "update" && (
                            <Update
                                model={dialogConfig.data}
                                onDialogConfig={onDialogConfig}
                                params={queryParams}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
