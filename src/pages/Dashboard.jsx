import React from 'react';
import { 
  Building2, 
  Users, 
  Eye, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Jan', properties: 40, views: 2400 },
  { name: 'Feb', properties: 30, views: 1398 },
  { name: 'Mar', properties: 20, views: 9800 },
  { name: 'Apr', properties: 27, views: 3908 },
  { name: 'May', properties: 18, views: 4800 },
  { name: 'Jun', properties: 23, views: 3800 },
  { name: 'Jul', properties: 34, views: 4300 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="ag-card p-6 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <div className="flex items-center mt-2">
        {trend === 'up' ? (
          <ArrowUpRight className="text-emerald-500 mr-1" size={16} />
        ) : (
          <ArrowDownRight className="text-red-500 mr-1" size={16} />
        )}
        <span className={`text-xs font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
          {trendValue}
        </span>
        <span className="text-xs text-slate-400 ml-1">vs last month</span>
      </div>
    </div>
    <div className="stat-card-icon text-primary">
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Properties" 
          value="1,284" 
          icon={Building2} 
          trend="up" 
          trendValue="12.5%" 
        />
        <StatCard 
          title="Active Listings" 
          value="842" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="8.2%" 
        />
        <StatCard 
          title="New Leads" 
          value="156" 
          icon={Users} 
          trend="up" 
          trendValue="24.1%" 
        />
        <StatCard 
          title="Blog Views" 
          value="42.5K" 
          icon={Eye} 
          trend="down" 
          trendValue="3.1%" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Properties Growth */}
        <div className="ag-card p-6">
            <h4 className="text-lg font-bold text-slate-900 mb-6">Property Listings Growth</h4>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorProp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#baa360" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#baa360" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b', fontSize: 12}}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b', fontSize: 12}}
                        />
                        <Tooltip 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="properties" 
                            stroke="#baa360" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorProp)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Traffic Statistics */}
        <div className="ag-card p-6">
            <h4 className="text-lg font-bold text-slate-900 mb-6">Inquiry Traffic</h4>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b', fontSize: 12}}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b', fontSize: 12}}
                        />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar 
                            dataKey="views" 
                            fill="#baa360" 
                            radius={[6, 6, 0, 0]} 
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
