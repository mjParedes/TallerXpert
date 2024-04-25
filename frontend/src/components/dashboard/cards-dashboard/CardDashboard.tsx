'use client'

import { Order, Report, Supplier } from "@/components"
import Link from "next/link";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal/Modal";
import { getCountOrders } from "@/actions/orders/getOrders";
import { getCountProducts, getCountSuppliers } from "@/app/dashboard/orders/orderRequest";

export const CardsDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);

  useEffect(() => {
    // Llamada al servidor para obtener el recuento de órdenes después de que el componente se monte
    const fetchOrdersCount = async () => {
      const countO = await getCountOrders();
      const countS = await getCountSuppliers();
      const countP = await getCountProducts();
      setOrdersCount(countO);
      setSuppliersCount(countS);
      setProductsCount(countP);
    };
    fetchOrdersCount();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
        <Link
          href={"/dashboard/orders/new-order"}
          className={`bg-[#F1CC5B] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}
        >
          <div>
            <Order />
          </div>

          <h1 className="text-2xl capitalize">nueva orden de trabajo</h1>

          <span className="text-right">
            {ordersCount == 0 ? "" : `Total ${ordersCount}`}
          </span>
        </Link>

        <div
          onClick={handleClick}
          className={`bg-[#8A7CC9] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}
        >
          <div>
            <Report />
          </div>

          <h1 className="text-2xl capitalize">nuevo informe de trabajo</h1>

          <span className="text-right">
            {productsCount == 0 ? "" : `Total ${productsCount}`}
          </span>
        </div>

        <Link
          href={"/dashboard/suppliers/create"}
          onClick={handleClick}
          className={`bg-[#EB6196] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}
        >
          <div>
            <Supplier />
          </div>

          <h1 className="text-2xl capitalize">agregar proveedor</h1>

          <span className="text-right">
            {suppliersCount == 0 ? "" : `Total ${suppliersCount}`}
          </span>
        </Link>

        <div
          onClick={handleClick}
          className={`bg-[#34A853] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}
        >
          <div>
            <Report />
          </div>

          <h1 className="text-2xl capitalize">consultar reparación</h1>

          <span className="text-right">
            {productsCount == 0 ? "" : `Total ${productsCount}`}
          </span>
        </div>
      </div>

      <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <h1>Modal</h1>
      </Modal>
    </>
  );
}