<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsRequest;
use App\Http\Resources\NewsResource;
use App\ImageConverter;
use App\Laravue\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $searchParams = $request->all();
        $newsQuery = News::query();
        $limit = Arr::get($searchParams, 'limit', 10);
        $keyword = Arr::get($searchParams, 'keyword', '');

        if (!empty($role)) {
            $newsQuery->whereHas('roles', function($q) use ($role) { $q->where('name', $role); });
        }

        if (!empty($keyword)) {
            $newsQuery->where('name', 'LIKE', '%' . $keyword . '%');
        }
        return NewsResource::collection($newsQuery->paginate($limit));
    }

    public function store(NewsRequest $request)
    {
        $path = ImageConverter::convert($request->image_uri);
        $request->image = $path;
        return News::create([
            'title_lt' => $request->title_lt,
            'description_lt' => $request->description_lt,
            'title_ru' => $request->title_ru,
            'description_ru' => $request->description_ru,
            'title_en' => $request->title_en,
            'description_en' => $request->description_en,
            'image' => $path,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(NewsRequest $request, News $news)
    {
        return $news->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(News $news)
    {
        return $news->delete();
    }
}
