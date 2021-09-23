import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import { gql, useQuery, useMutation } from '@apollo/client'

function Home () {
//     const { data, loading, error, refetch } = useQuery(GetPenumpang);
//     const [hapus, {loading : loadingDelete}] = useMutation(hapusPenumpang,{
//         refetchQueries: [GetPenumpang]
//    });

//     if (error) {
//         console.log(error)
//         return null
//     }
    
    // tambahPengunjung = newUser => {
    //     const newData = {
    //         id: uuidv4(),
    //         ...newUser
    //     }; 
    //     this.setState({    
    //         data: [...state.data, newData]  
    //     });
    // };
    
        return (
            <div>
                <Header/>
                <ListPassenger 
                    // data={data}
                    // hapusPengunjung={hapusPengunjung}
                />
                <PassengerInput
                    // tambahPengunjung={tambahPengunjung}
                />
            </div>
        )
}

export default Home;