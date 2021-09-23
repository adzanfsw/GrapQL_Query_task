import "./Home.css"
import { gql, useMutation } from '@apollo/client'

const ListItem = (props) => {
    console.log("props dari lis item", props)
    
     const { id, nama, umur, jenisKelamin } = props.data
    // const [hapus] = useMutation(hapusPengunjung, {
    //     refetchQueries: [GetPenumpang]
    //   });

    // const onDeleteItem = (idx) => {
    //     hapus({variables :{
    //       id:idx
    //     }})
    // };

    return (
        <tr>
            <td>{nama}</td>
            <td>{umur}</td>
            <td>{jenisKelamin}</td>
            <td className="removeBorder" onClick={() => props.hapusPengunjung(id)}><button>Hapus</button></td>
        </tr>
    )
}

export default ListItem;