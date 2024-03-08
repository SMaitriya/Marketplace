import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';

const Success = (props) => {
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="mt-8 bg-blue-200 p-6 rounded-md shadow">
                <h2 className="text-green-800 text-2xl font-semibold mb-4">Succès !</h2>
                <p>Votre formulaire a été enregistré avec succès.</p>
            </div>
        </AuthenticatedLayout>
    );
}

export default Success;