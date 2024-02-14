import ItemsPropsModel from "../../../../Models/ItemsPropsModel";
import VacationCard from "../../VacationCard/VacationCard";

function Items({ currentItems }: ItemsPropsModel): JSX.Element {
    return (
        <>
            {currentItems &&
                currentItems.map(v => <VacationCard key={v.vacationUUID}
                    vacationUUID={v.vacationUUID}
                    vacationCity={v.vacationCity}
                    vacationCountry={v.vacationCountry}
                    vacationDescription={v.vacationDescription}
                    vacationId={v.vacationId}
                    vacationStartDate={v.vacationStartDate}
                    vacationEndDate={v.vacationEndDate}
                    vacationPrice={v.vacationPrice}
                    vacationCountryISO={v.vacationCountryISO}
                    vacationImageName={v.vacationImageName}
                    vacationImageUrl={v.vacationImageUrl}
                    vacationUploadedImage={v.vacationUploadedImage}
                    vacationIsFollowing={v.vacationIsFollowing}
                    vacationFollowersCount={v.vacationFollowersCount} />
                )}
        </>
    );
}

export default Items;
