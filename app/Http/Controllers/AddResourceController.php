<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProvinceRequest;
use App\Http\Requests\StoreRegionRequest;
use App\Models\Province;
use App\Models\Region;

class AddResourceController extends Controller
{
    public function addRegion(StoreRegionRequest $request)
    {
        Region::create($request->validated());

        session()->flash('message', 'Succcessfuly created a new region');
    }

    public function addProvince(StoreProvinceRequest $request)
    {
        Province::create($request->validated());

        session()->flash('message', 'Succcessfuly created a new province');
    }
}
