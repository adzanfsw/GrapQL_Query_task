import { useState } from "react";
import ListItem from "./ListItem";

import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import PassengerInput from "./PassengerInput";

const GetPenumpang = gql`
    query MyQuery {
        anggota {
            nama
            umur
            jenisKelamin
        }
      }
    `;

const hapusPenumpang = gql`
    mutation MyMutation($id: Int!) {
        delete_anggota_by_pk(id: $id)
    }
`;

const InsertUser = gql`
  mutation MyMutation($object: anggota_insert_input!) {
    insert_anggota_one(object: $object) {
      id
    }
  }
`;

const subscriptionpenumpang = gql`
  subscription MySubscription {
    anggota {
      id
      nama
      umur
      jenisKelamin
    }
}
`;

const ListPassenger = () => {
    // const {data, error} = useQuery(GetPenumpang);
    const {data, error} = useSubscription(subscriptionpenumpang);
    const [hapus] = useMutation(hapusPenumpang, {
        refetchQueries: [GetPenumpang],
    });
    const [insertUser] = useMutation(InsertUser, {
        refetchQueries: [GetPenumpang],
      });
    const [nama, setNama] = useState("");
    const [umur, setUmur] = useState("");
    const [jenis_kelamin, setJenisKelamin] = useState("");
    const [editing, setEditing] = useState(true);
    const [userId, setUserId] = useState(0);

    if (error) {
        console.log(error)
        return null
    }

    const hapusPengunjung = (index) => {
        console.log("ashdajlsdjsa")

        hapus({
            variables :{
            id: index,
        }})
    };

    const tambahPengunjung = (e) => {
        insertUser({
          variables: {
            object: {
              nama: nama,
              umur: umur,
              jenis_kelamin: jenis_kelamin,
            },
          },
        });
      };

      const onChangeUserId = (e) => {
        if (e.target) {
          setUserId(e.target.value);
        }
      };

      const onChangeNama = (e) => {
        if (e.target) {
          setNama(e.target.value);
        }
      };

      const onChangeUmur = (e) => {
        if (e.target) {
          setUmur(e.target.value);
        }
      };

      const onChangeGender = (e) => {
        if (e.target) {
          setJenisKelamin(e.target.value);
        }
      };

      const handleSubmit = (e) => {
        if (nama.trim() && umur && jenis_kelamin) {
          if (umur >= 75 || umur <= 12) {
            alert("Umur tidak sesuai");
          } else {
            const newData = {
              nama: nama,
              umur: umur,
              jenisKelamin: jenis_kelamin,
              id: userId,
            };
            tambahPengunjung(newData);
    
            setNama("");
            setUmur("");
            setJenisKelamin("");
          }
        } else {
          alert("Data masih ada yang kosong");
        }
      };

      const handleBukaInput = () => {
        setEditing(false);
      };

      const handleTutupInput = () => {
        setEditing(true); 
      };

      let viewMode = {};
      let editMode = {};
    
      if (editing) {
        viewMode.display = "none";
      } else {
        editMode.display = "none";
      }

    return (
    <>
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {data?.anggota.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        hapusPengunjung={() => hapusPengunjung(item.id)}
                    />
                ))}
            </table>
        </div>
            <PassengerInput
            onChangeNama={onChangeNama}
            onChangeUmur={onChangeUmur}
            onChangeGender={onChangeGender}
            handleBukaInput={handleBukaInput}
            handleSubmit={handleSubmit}
            handleTutupInput={handleTutupInput}
            tambahPengunjung={tambahPengunjung}
            nama={nama}
            umur={umur}
            jenis_kelamin={jenis_kelamin}
            viewMode={viewMode}
            editMode={editMode}
            />
    </>
    )
}

export default ListPassenger;