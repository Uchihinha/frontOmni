import React, { useState, useEffect } from 'react';

import './globals.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';

import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';

// Componente 	--> Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade 	--> Informações que o componente PAI passa para o componente FILHO
// Estado		--> Informações mantidas pelo componente (Imutabilidade JS)

function App() { // JSX (JavaScript + HTML)

	const [devs, setDevs] = useState([]);

	useEffect(() => {
		async function loadDevs() {
			const response = await api.get('/devs');
			setDevs(response.data.data);
		};
		
		loadDevs();
	}, [])

	async function handleAddDev(e) {
		const response = await api.post('/devs', e); 
		setDevs([...devs, response.data.data]);
	}

	return (
		<div id="app">
			<aside>
				<strong>Cadastrar</strong>
				<DevForm onSubmit={handleAddDev} />
			</aside>
			<main>
				<ul>
					{devs.map(dev => (
						<DevItem key={dev._id} dev={dev} />
					))}
					
				</ul>
			</main>
		</div>
	);
}

export default App;
