import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            networks: [],
            isLoading: true
        };

    }

    async fetchUsers() {
        const res = await fetch(`http://api.citybik.es/v2/networks`);
        const networks = await res.json();
        await this.setState({ networks });
    }

    async componentDidMount() {
        await this.fetchUsers();
        this.setState({ isLoading: false });
    }

    createTab() {

        const { networks } = this.state;
        const tab = [];
        for (let i = 0, len = networks.networks.length; i < len; i += 1) {
            tab.push(
                <TableRow key={networks.networks[i].id}>
                    <TableCell>{networks.networks[i].name}</TableCell>
                    <TableCell>{networks.networks[i].company}</TableCell>
                    <TableCell>{networks.networks[i].location.city}</TableCell>
                    <TableCell>{networks.networks[i].location.country}</TableCell>
                </TableRow>);
        }

        return (
            <div>
                <Paper >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Company</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right">Country</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { tab }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

    createFilteredTab(event) {
        const { networks } = this.state;
        const tab = [];
        for (let i = 0, len = networks.networks.length; i < len; i += 1) {
            if (networks.networks[i].location.country === event.target.value) {
                tab.push(
                    <TableRow key={networks.networks[i].id}>
                        <TableCell>{networks.networks[i].name}</TableCell>
                        <TableCell>{networks.networks[i].company}</TableCell>
                        <TableCell>{networks.networks[i].location.city}</TableCell>
                        <TableCell>{networks.networks[i].location.country}</TableCell>
                    </TableRow>);
            }
        }
        return (
            <div>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name </TableCell>
                                <TableCell align="right">Company</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right">Country</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { tab }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

    render() {

        const { isLoading } = this.state;

        return (
            <React.Fragment>
                <h1>Networks Table</h1>
                <div>
                    {/* Ne fonctionne pas */}
                    <input type="text" id="country" name="country" placeholder={"Enter country name"} onChange={this.createFilteredTab}/>
                </div>
                { !isLoading && this.createTab() }
            </React.Fragment>
        );
    }

}
export default App;
