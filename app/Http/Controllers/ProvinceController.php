<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProvinceRequest;
use App\Http\Requests\UpdateProvinceRequest;
use App\Http\Resources\ProvinceResource;
use App\Models\Province;
use App\Models\Region;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class ProvinceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $model = Province::query()
            ->where('name', 'like', '%'.request()->query('search').'%')
            ->orWhere('description', 'like', '%'.request()->query('search').'%')
            ->orWhereHas('region', function (Builder $query) {
                $query->where('name', 'like', '%'.request()->query('search').'%');
            })
            ->orWhereHas('region', function (Builder $query) {
                $query->where('description', 'like', '%'.request()->query('search').'%');
            })
            ->orderBy(
                request('sort_field', 'created_at'),
                request('sort_direction', 'desc')
            )
            ->paginate(5)
            ->appends(request()->query());

        return Inertia::render('Provinces/Index', [
            'model' => ProvinceResource::collection($model),
            'regions' => Region::orderBy('name', 'asc')->pluck('id', 'name'),
            'queryParams' => request()->query(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProvinceRequest $request)
    {
        Province::create($request->validated());

        session()->flash('message', 'Succcessfuly created a new province');

        return redirect(route('provinces.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Province $province)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Province $province)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProvinceRequest $request, Province $province)
    {
        $province->update($request->validated());

        session()->flash('message', 'Succcessfuly updated a province');

        return redirect(route('provinces.index', $request->query()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Province $province)
    {
        //
    }
}
