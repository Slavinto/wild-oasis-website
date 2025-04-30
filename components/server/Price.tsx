import { getCabinPrice } from "@/lib/data-service";

async function Price({ cabinId }: { cabinId: string }) {
    const { regular_price, discount } = await getCabinPrice(Number(cabinId));

    if (!regular_price || !discount) {
        throw new Error("Failed to fetch cabin price data");
    }

    return (
        <p className='mt-12 text-3xl flex gap-3 items-baseline'>
            {discount > 0 ? (
                <>
                    <span className='text-3xl font-[350]'>
                        ${regular_price - discount}
                    </span>
                    <span className='line-through font-semibold text-primary-600'>
                        ${regular_price}
                    </span>
                </>
            ) : (
                <span className='text-3xl font-[350]'>${regular_price}</span>
            )}
            <span className='text-primary-200'>/ night</span>
        </p>
    );
}

export default Price;
