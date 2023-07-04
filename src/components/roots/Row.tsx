'use client';

import { IRow } from '@src/types/roots';
import { IOpenId } from '@src/types/roots/Row';
import Link from 'next/link';
import { RxCaretRight, RxCaretDown } from 'react-icons/rx';

export const Row = ({
  item,
  level,
  children,
  toggleActive,
  activeId,
  openIds,
  setOpenIds,
  childIsAParent,
}: IRow) => {
  const shouldExpand = () => {
    let exits = false;
    if (openIds.length) {
      for (let i = 0; i < openIds.length; i++) {
        if (openIds[i].id == item.id) {
          exits = true;
          break;
        }
      }
    }
    return exits;
  };

  return (
    <div key={`section-${item.id}`} className="">
      <div
        className="mb- rounded p-[5px] cursor-pointer hover:bg-primary/[.5]"
        // we are setting the condition for next click
        onClick={() => {
          let newIds: IOpenId[] = [];
          let exits = false;
          let levelExits = false;

          for (let i = 0; i < openIds.length; i++) {
            if (openIds[i].id == item.id) {
              exits = true;
            }

            if (openIds[i].level == level) {
              levelExits = true;
            }

            if (exits || levelExits) {
              // console.log("some one exits");
            } else {
              newIds.push(openIds[i]);
            }
          }

          // console.log("level exits ", levelExits);
          // console.log("item exits ", exits);
          // console.log("openids are ", openIds);

          if (levelExits) {
            if (exits) setOpenIds(newIds);
            else setOpenIds([...newIds, { id: item.id, level }]);
          } else {
            if (exits) setOpenIds(newIds);
            else setOpenIds([...openIds, { id: item.id, level }]);
          }

          toggleActive(item.id);
        }}
      >
        {/* avatar  */}

        <Link
          // href={`${haveChild ? `/${item.id}` : `/${item.id}`}`}
          href={`/${item.id}`}

          // prefetch={false}
        >
          <div className="flex items-center gap-2">
            {/* if item.iconUrl then show image */}
            {item.photo ? <img width="20" src={item.photo} alt="icon" /> : null}
            <p
              className={`text-[13px] ${
                item.id == activeId ? 'text-red-600 font-bold' : null
              }`}
            >
              {item.name}
            </p>

            {childIsAParent && (
              <span className="ml-auto">
                {shouldExpand() ? <RxCaretDown /> : <RxCaretRight />}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* children */}
      <div
        className={`${shouldExpand() ? 'block' : 'hidden'} border-l`}
        // className={`hidden border-l`}
        style={{
          //   marginLeft: `${level * 20}px`,
          //   paddingLeft: `${level * 20}px`,
          //   paddingLeft: `${20}px`,
          marginLeft: `${level == 1 ? 15 : 5}px`,
          //   paddingLeft: `${level == 1 ? 15 : 0}px`,
          paddingLeft: `${15}px`,
        }}
      >
        <div className={`children`}>{children}</div>
      </div>
    </div>
  );
};
