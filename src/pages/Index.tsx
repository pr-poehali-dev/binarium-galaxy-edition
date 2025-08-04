import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeAccount, setActiveAccount] = useState<'demo' | 'real'>('demo');

  const accounts = {
    demo: {
      balance: 10000,
      currency: '₽',
      profit: 2500,
      profitPercent: 33.3,
      trades: 24,
      winRate: 75
    },
    real: {
      balance: 50000,
      currency: '₽', 
      profit: -1200,
      profitPercent: -2.3,
      trades: 12,
      winRate: 58
    }
  };

  const currentAccount = accounts[activeAccount];

  const recentTrades = [
    { asset: 'EUR/USD', direction: 'up', amount: 500, result: 'win', profit: 910, time: '14:25' },
    { asset: 'BTC/USD', direction: 'down', amount: 1000, result: 'loss', profit: 0, time: '14:18' },
    { asset: 'Gold', direction: 'up', amount: 750, result: 'win', profit: 1365, time: '14:12' },
    { asset: 'EUR/GBP', direction: 'down', amount: 300, result: 'win', profit: 546, time: '14:05' },
  ];

  const portfolioData = [
    { asset: 'EUR/USD', allocation: 35, value: 17500, change: 4.2 },
    { asset: 'BTC/USD', allocation: 25, value: 12500, change: -2.1 },
    { asset: 'Gold', allocation: 20, value: 10000, change: 1.8 },
    { asset: 'S&P 500', allocation: 20, value: 10000, change: 2.5 }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">TradePlatform</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Обзор</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Портфель</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Аналитика</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Настройки</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant={activeAccount === 'demo' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAccount('demo')}
                className="font-medium"
              >
                Демо
              </Button>
              <Button
                variant={activeAccount === 'real' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAccount('real')}
                className="font-medium"
              >
                Реальный
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {activeAccount === 'demo' ? 'Демо-счёт' : 'Реальный счёт'}
              </h2>
              <p className="text-slate-600 mt-1">Управление торговыми позициями</p>
            </div>
            <Badge variant={activeAccount === 'demo' ? 'secondary' : 'default'} className="px-3 py-1">
              {activeAccount === 'demo' ? 'DEMO' : 'LIVE'}
            </Badge>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Баланс счёта</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {currentAccount.balance.toLocaleString('ru-RU')} {currentAccount.currency}
                </div>
                <div className="text-sm text-slate-600 mt-1">Доступно для торговли</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Прибыль/убыток</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${currentAccount.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentAccount.profit >= 0 ? '+' : ''}{currentAccount.profit.toLocaleString('ru-RU')} {currentAccount.currency}
                </div>
                <div className={`text-sm mt-1 ${currentAccount.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentAccount.profitPercent >= 0 ? '+' : ''}{currentAccount.profitPercent}% за месяц
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Сделки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{currentAccount.trades}</div>
                <div className="text-sm text-slate-600 mt-1">За последние 30 дней</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Успешность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{currentAccount.winRate}%</div>
                <Progress value={currentAccount.winRate} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="portfolio">Портфель</TabsTrigger>
            <TabsTrigger value="trades">Сделки</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trading Interface */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Activity" size={20} />
                    <span>Быстрая торговля</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Актив</label>
                      <select className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>EUR/USD</option>
                        <option>BTC/USD</option>
                        <option>Gold</option>
                        <option>S&P 500</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Сумма</label>
                      <input 
                        type="number" 
                        placeholder="1000"
                        className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
                      <Icon name="TrendingUp" size={16} className="mr-2" />
                      Вверх
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3">
                      <Icon name="TrendingDown" size={16} className="mr-2" />
                      Вниз
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Потенциальная прибыль:</span>
                      <span className="font-semibold text-green-600">+1,820 ₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="BarChart3" size={20} />
                    <span>Рыночные данные</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { pair: 'EUR/USD', price: '1.0892', change: '+0.0012', percent: '+0.11%' },
                      { pair: 'BTC/USD', price: '43,250', change: '-1,200', percent: '-2.70%' },
                      { pair: 'Gold', price: '2,018', change: '+15.2', percent: '+0.76%' },
                      { pair: 'S&P 500', price: '4,756', change: '+28.4', percent: '+0.60%' }
                    ].map((item) => (
                      <div key={item.pair} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="font-medium text-slate-900">{item.pair}</div>
                        <div className="text-right">
                          <div className="font-semibold">{item.price}</div>
                          <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change} ({item.percent})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Структура портфеля</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map((item) => (
                    <div key={item.asset} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="font-medium text-slate-900">{item.asset}</div>
                          <div className="text-sm text-slate-600">{item.allocation}% портфеля</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.value.toLocaleString('ru-RU')} ₽</div>
                        <div className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Последние сделки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${trade.result === 'win' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                          <div className="font-medium text-slate-900">{trade.asset}</div>
                          <div className="text-sm text-slate-600">
                            {trade.direction === 'up' ? '↑' : '↓'} {trade.amount.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${trade.result === 'win' ? 'text-green-600' : 'text-red-600'}`}>
                          {trade.result === 'win' ? '+' : ''}{trade.profit.toLocaleString('ru-RU')} ₽
                        </div>
                        <div className="text-sm text-slate-600">{trade.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;