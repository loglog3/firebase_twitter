import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService()
      .collection("nweets")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService().collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = async (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    console.log("파일즈");
    console.log(files);
    console.log("파일즈[0]");
    const theFile = files[0];
    console.log(files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      console.log("온로드엔드 이벤트");
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      //최신 es6 문법, 객체 안에있는거 그대로 꺼내오기(이름포함)
      setAttachment(result);
      // 0. input type file로 파일 넣기.
      // 1. event.target.file[0] 이용,  FileReader API 호출 및 넣기
      // 2. readAsDataURL 로 변형하기
      // 3. onloadend 메소드 이용, event.currentTarget.result 로 결과값받기
      // 4. 이 result가 img src={result} 가 되는 것
      // 본질은 file을 업로드하고 그것을 string으로 바꾸는 것
    };
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <input type="file" accept="image/*" onChange={onFileChange} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
