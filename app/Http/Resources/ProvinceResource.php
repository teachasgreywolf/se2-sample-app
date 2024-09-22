<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProvinceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'region' => new RegionResource($this->region),
            'createdBy' => $this->createdBy,
            'createdAt' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updatedAt' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
