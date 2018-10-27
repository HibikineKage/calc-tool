import * as React from 'react';
import './App.css';

interface IState {
  paperSize: number;
  dpi: number;
}

const getWidth = (n: number): number => {
  if (n <= 0) {
    return 1189;
  } else if (n === 1) {
    return 841;
  }
  return Math.floor(getWidth(n - 2) / 2);
};
const calcPixel = (len: number, dpi: number) => Math.floor((len / 25.4) * dpi);

class App extends React.Component<{}, IState> {
  public state = { paperSize: 0, dpi: 0 };

  public render() {
    const { paperSize, dpi } = this.state;
    const width = getWidth(paperSize);
    const height = getWidth(paperSize + 1);
    const pixelWidth = calcPixel(width, dpi);
    const pixelHeight = calcPixel(height, dpi);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ピクセル数計算機</h1>
        </header>
        <p className="App-main">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="paperSize">A</label>
                </td>
                <td>
                  <input
                    id="paperSize"
                    type="number"
                    value={paperSize}
                    onChange={this.onChange('paperSize')}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="dpi">DPI</label>
                </td>
                <td>
                  <input
                    id="dpi"
                    type="number"
                    value={dpi}
                    onChange={this.onChange('dpi')}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="width-mm">幅(mm)</label>
                </td>
                <td>
                  <input id="width-mm" readOnly={true} value={width} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="height-mm">高さ(mm)</label>
                </td>
                <td>
                  <input id="height-mm" readOnly={true} value={height} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="width-px">幅(px)</label>
                </td>
                <td>
                  <input id="width-px" readOnly={true} value={pixelWidth} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="height-px">高さ(px)</label>
                </td>
                <td>
                  <input id="height-px" readOnly={true} value={pixelHeight} />
                </td>
              </tr>
            </tbody>
          </table>
        </p>
      </div>
    );
  }

  private onChange = (key: keyof IState) => (
    e: React.FormEvent<HTMLInputElement>
  ) => this.setState({ [key]: parseInt(e.currentTarget.value, 10) } as any);
}

export default App;
