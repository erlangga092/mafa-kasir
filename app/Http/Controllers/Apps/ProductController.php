<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::when(request()->q, function ($products) {
            return $products->where('title', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return Inertia::render('Apps/Product/index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        $last_product_id = DB::table('products')->latest()->first()->id ?? 0;

        if (!$last_product_id) {
            $last_product_id = 0;
        }

        return Inertia::render('Apps/Product/Create', [
            'categories' => $categories,
            'last_product_id' => $last_product_id
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2000',
            'barcode' => 'required|unique:products,barcode',
            'title' => 'required|unique:products,title',
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'stock' => 'required'
        ]);

        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());

        Product::create([
            'image' => $image->hashName(),
            'barcode' => $request->barcode,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'buy_price' => $request->buy_price,
            'sell_price' => $request->sell_price,
            'stock' => $request->stock
        ]);

        return redirect()->route('apps.products.index');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('Apps/Product/Edit', [
            'categories' => $categories,
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $this->validate($request, [
            'image' => 'nullable|image|mimes:png,jpg,jpeg|max:2000',
            'barcode' => 'required|unique:products,barcode,' . $product->id,
            'title' => 'required|unique:products,title,' . $product->id,
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'stock' => 'required'
        ]);

        if ($request->file('image')) {
            Storage::disk('local')->delete('public/products/' . basename($product->image));

            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());

            $product->update([
                'image' => $image->hashName(),
                'barcode' => $request->barcode,
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'buy_price' => $request->buy_price,
                'sell_price' => $request->sell_price,
                'stock' => $request->stock
            ]);
        } else {
            $product->update([
                'barcode' => $request->barcode,
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'buy_price' => $request->buy_price,
                'sell_price' => $request->sell_price,
                'stock' => $request->stock
            ]);
        }

        return redirect()->route('apps.products.index');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        Storage::disk('local')->delete('public/products/' . basename($product->image));
        return redirect()->route('apps.products.index');
    }
}
