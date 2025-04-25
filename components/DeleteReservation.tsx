import { deleteReservation } from "@/lib/actions";
import { HiOutlineTrash } from "react-icons/hi2";
import ModalButton from "./modal/ModalButton";

function DeleteReservation({ bookingId }: { bookingId: number }) {
    return (
        <form
            action={deleteReservation}
            className='flex items-center justify-center h-1/2'
        >
            <input type='hidden' value={bookingId} name='bookingId' />
            <ModalButton buttonText='Delete' icon={<HiOutlineTrash />} />
        </form>
    );
}

export default DeleteReservation;
