<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DocumentResource;
use App\ImageConverter;
use App\Laravue\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $searchParams = $request->all();
        $pageQuery = Document::query();
        $limit = Arr::get($searchParams, 'limit', 10);
        $keyword = Arr::get($searchParams, 'keyword', '');
        if (!empty($keyword)) {
            $pageQuery->where('title_lt', 'LIKE', '%' . $keyword . '%');
            $pageQuery->orWhere('title_ru', 'LIKE', '%' . $keyword . '%');
            $pageQuery->where('title_en', 'LIKE', '%' . $keyword . '%');
        }
        return DocumentResource::collection($pageQuery->paginate($limit));
    }

    public function store(Request $request)
    {
        $path = ImageConverter::convert($request->image);
        return Document::create([
            'name' => $request->name,
            'path' => $path,
        ]);
    }

    public function update(Request $request, Document $document)
    {
        return $document->update($request->all());
    }

    public function destroy(Document $document)
    {
        return $document->delete();
    }
}
