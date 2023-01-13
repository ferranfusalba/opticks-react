// React
import Savings from '../../components/Savings/Savings';
import TrafficVeracity from '../../components/TrafficVeracity/TrafficVeracity';
import ThreatDistribution from '../../components/ThreatDistribution/ThreatDistribution';
import Range from '../../components/Range/Range';
import Widgets from '../../components/Widgets/Widgets';
import CentralContent from '../../components/CentralContent/CentralContent';

function FraudAnalysisView() {
    return (
        <div className="fraud-analysis">
            <Range />
            <Widgets>
                <Savings />
                <TrafficVeracity />
                <ThreatDistribution />
            </Widgets>
            <CentralContent title={'The Table'} />
        </div>
    );
}

export default FraudAnalysisView;