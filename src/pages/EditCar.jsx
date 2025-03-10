import { useParams } from 'react-router-dom';

function EditCar() {
    const { id } = useParams();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Vehicle {id}</h1>
            {/* Edit car form here */}
        </div>
    );
}

export default EditCar;
