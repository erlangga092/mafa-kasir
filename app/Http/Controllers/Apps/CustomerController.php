<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::when(request()->q, function ($customers) {
            return $customers->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return Inertia::render('Apps/Customer/index', [
            'customers' => $customers
        ]);
    }

    public function create()
    {
        return Inertia::render('Apps/Customer/Create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'no_telp' => 'required|unique:customers,no_telp',
            'address' => 'required'
        ]);

        Customer::create([
            'name' => $request->name,
            'no_telp' => $request->no_telp,
            'address' => $request->address
        ]);

        return redirect()->route('apps.customers.index');
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        return Inertia::render('Apps/Customer/Edit', [
            'customer' => $customer
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $this->validate($request, [
            'name' => 'required',
            'no_telp' => 'required|unique:customers,no_telp,' . $customer->id,
            'address' => 'required'
        ]);

        $customer->update([
            'name' => $request->name,
            'no_telp' => $request->no_telp,
            'address' => $request->address
        ]);

        return redirect()->route('apps.customers.index');
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return redirect()->route('apps.customers.index');
    }
}
