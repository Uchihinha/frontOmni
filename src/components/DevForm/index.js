import React, { useState, useEffect } from 'react';

function DevForm(props) {
    const { onSubmit } = props;
 
    const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setLatitude(latitude);
				setLongitude(longitude);
			},
			(err) => {
				console.log('DEU ERRADO');
				console.log(err);
			},{
				timeout: 30000
			}
		);
    }, []); // passar array vazio caso queira que seja executada uma única vez
    
    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
			techs,
			latitude,
			longitude
        });

        setGithubUsername('');
		setTechs('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block"> 
                <label htmlFor="github_username">Usuário do GitHub</label>
                <input name="github_username" id="github_username" value={github_username} required onChange={e => setGithubUsername(e.target.value)}/>
            </div>

            <div className="input-block"> 
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" id="techs" value={techs} required onChange={e => setTechs(e.target.value)}/>
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input 
                        type="number" 
                        name="latitude" 
                        id="latitude" 
                        value={latitude} 
                        required
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input 
                        type="number" 
                        name="longitude" 
                        id="longitude" 
                        value={longitude} 
                        required
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>

        </form>
    );
}

export default DevForm;