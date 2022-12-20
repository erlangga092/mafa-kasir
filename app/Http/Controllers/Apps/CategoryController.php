<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::when(request()->q, function ($categories) {
            return $categories->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return Inertia::render('Apps/Category/index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Apps/Category/Create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2000',
            'name' => 'required',
            'description' => 'required'
        ]);

        $image = $request->file('image');
        $image->storeAs('public/categories', $image->hashName());

        Category::create([
            'image' => $image->hashName(),
            'name' => $request->name,
            'description' => $request->description
        ]);

        return redirect()->route('apps.categories.index');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('Apps/Category/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        Log::info("request-name" . $request);

        $validated = $this->validate($request, [
            'image' => 'nullable|image|mimes:png,jpg,jpeg|max:2000',
            'name' => 'required|unique:categories,name,' . $category->id,
            'description' => 'required'
        ]);

        if ($request->file('image')) {
            Storage::disk('local')->delete('public/categories/' . basename($category->image));

            $image = $request->file('image');
            $image->storeAs('public/categories', $image->hashName());

            $category->update([
                'image' => $image->hashName(),
                'name' => $request->name,
                'description' => $request->description
            ]);
        } else {
            $category->update([
                'name' => $request->name,
                'description' => $request->description
            ]);
        }

        return redirect()->route('apps.categories.index');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        Storage::disk('local')->delete('public/categories/' . basename($category->image));
        return redirect()->route('apps.categories.index');
    }
}
