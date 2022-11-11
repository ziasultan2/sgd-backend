<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MapResource;
use App\Laravue\Models\Map;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $searchParams = $request->all();
        $pageQuery = Map::query();
        $limit = Arr::get($searchParams, 'limit', 10);
        $keyword = Arr::get($searchParams, 'keyword', '');
        if (!empty($keyword)) {
            $pageQuery->where('title_lt', 'LIKE', '%' . $keyword . '%');
            $pageQuery->orWhere('title_ru', 'LIKE', '%' . $keyword . '%');
            $pageQuery->where('title_en', 'LIKE', '%' . $keyword . '%');
        }
        return MapResource::collection($pageQuery->paginate($limit));
    }


    public function store(Request $request)
    {
        return Map::create($request->all());
    }


    public function update(Request $request, $id)
    {
        return Map::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Map::destroy($id);
    }
}
