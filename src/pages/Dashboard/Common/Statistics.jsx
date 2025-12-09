import CustomerMenu from '../../../components/Dashboard/Sidebar/Menu/CustomerMenu';
import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import CustomerStatistics from '../../../components/Dashboard/Statistics/CustomerStatistics';
import SellerStatistics from '../../../components/Dashboard/Statistics/SellerStatistics';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const { role, iseRoleLoading } = useRole();
  if(iseRoleLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      {role==='admin' && <AdminStatistics />}
      {role==='customer' && <CustomerStatistics></CustomerStatistics>}
      {role==='seller' && <SellerStatistics></SellerStatistics>}
    </div>
  )
}

export default Statistics
