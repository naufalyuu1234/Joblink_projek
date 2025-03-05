import MainLayout from '@/components/layouts/MainLayout';
import { useParams } from 'react-router-dom';
export default function Detail() {
    const {id} = useParams();
    return(
        <MainLayout>
            <h1>ini adalah detail halaman {id}</h1>
        </MainLayout>
    )
}