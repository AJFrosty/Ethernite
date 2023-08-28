import React from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';
import "./Profile.css";

const Profile = ({ account }) => {
  // ENS Name
  const { data: ensNameData } = useEnsName({
    address: account,
  });

  // ENS Avatar
  const { data: avatarData } = useEnsAvatar({
    name: ensNameData,
    chainID: 1,
  });

  return (
    <div className="container">
      <header className="header">
        {avatarData && <img src={avatarData} alt="Avatar" className="avatar" />}
        {ensNameData && <h1 className="ens-name">{ensNameData}</h1>}
      </header>

      <main className="main">
        <section className="analytics-section">
          <div className="analytics-card">
            <h2>Analytics</h2>
            <img
              src="https://cdn.discordapp.com/attachments/1119042949825703987/1145187158592860170/image.png"
              alt="Analytics Graph"
              className="analytics-graph"
            />
          </div>
        </section>
        
        <section className="ethereum">
  <div className="embedded-graph">
    <iframe
      src="https://www.coindesk.com/embedded-chart/Q8fMPPbr6cktp"
      frameBorder="0"
      title="Embedded Graph"
      width="100%" 
      height="500"  
    ></iframe>
  </div>
</section>

        <section className="tutorial-section">
          <h3>Learn</h3>
          <div className="video-container">
            <div className="video">
              <iframe src="https://www.youtube.com/embed/Yb6825iv0Vk" title="Video 1"></iframe>
            </div>
            <div className="video">
              <iframe src="https://www.youtube.com/embed/rYQgy8QDEBI" title="Video 2"></iframe>
            </div>
            <div className="video">
              <iframe src="https://www.youtube.com/embed/9UtxwQ50c2Y" title="Video 3"></iframe>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"></footer>
    </div>
  );
};

export default Profile;
