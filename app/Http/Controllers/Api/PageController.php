<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PageRequest;
use App\Http\Resources\PageResource;
use App\Laravue\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $searchParams = $request->all();
        $pageQuery = Page::query();
        $limit = Arr::get($searchParams, 'limit', 10);
        $keyword = Arr::get($searchParams, 'keyword', '');
        if (!empty($keyword)) {
            $pageQuery->where('name', 'LIKE', '%' . $keyword . '%');
        }
        return PageResource::collection($pageQuery->paginate($limit));
    }

    public function store(PageRequest $request)
    {
        return Page::create($request->all());
    }

    public function show(Page $page)
    {
        return new PageResource($page);
    }

    public function update(PageRequest $request, Page $page)
    {
        return $page->update($request->all());
    }

    public function destroy(Page $page)
    {
        return $page->delete();
    }
}
