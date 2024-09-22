/**
 * teachasgreywolf
 * May 17, 2024
 */

import AddRegion from "@/Components/AddResource/AddRegion";
import InputError from "@/Components/InputError";
import LabelEx from "@/Components/LabelEx";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Textarea } from "@/shadcn/ui/textarea";
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

const Update = ({ model, regions, onDialogConfig, params }) => {
    const { auth } = usePage().props;
    const { data, setData, patch, processing, reset, errors } = useForm({
        name: model.name ?? "",
        description: model.description ?? "",
        region_id: model.region.id ?? "",
        created_by: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("provinces.update", { province: model.id, ...params }), {
            onSuccess: () => {
                reset();

                onDialogConfig({
                    open: false,
                    process: "",
                    data: null,
                });
            },
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <div className="grid gap-4 mb-7 pt-3">
                    <div className="">
                        {/* prettier-ignore */}
                        <LabelEx htmlFor="name" required>Name</LabelEx>

                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            type="text"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="">
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="">
                        {/* prettier-ignore */}
                        <div className="relative">
                            <LabelEx htmlFor="region" required>Region</LabelEx>

                            <AddRegion resourceName="region" />
                        </div>

                        <select
                            value={data.region_id}
                            onChange={(e) =>
                                setData("region_id", e.target.value)
                            }
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select a region</option>
                            {Object.keys(regions).map((key) => (
                                <option value={regions[key]} key={regions[key]}>
                                    {key}
                                </option>
                            ))}
                        </select>

                        <InputError
                            message={errors.region_id}
                            className="mt-2"
                        />
                    </div>
                </div>

                {/* prettier-ignore */}
                <div className="flex justify-end space-x-3">
                    {processing
                        ? (
                            <Button disabled className="rounded-full w-40">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </Button>
                        )
                        : (
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                            >
                                Save
                            </Button>
                        )
                    }

                    <Button
                        variant="secondary"
                        onClick={(e) =>
                            onDialogConfig({
                                open: false,
                                process: "",
                                data: null,
                            })
                        }
                        className="rounded-full w-40"
                    >
                        Close
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Update;
