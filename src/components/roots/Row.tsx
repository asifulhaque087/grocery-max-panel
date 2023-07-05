'use client';

import { IRow } from '@src/types/roots';
import { IOpenId } from '@src/types/roots/Row';
import { FaPlus, FaMinus } from 'react-icons/fa';

export const Row = ({
  item,
  level,
  children,
  toggleActive,
  activeId,
  openIds,
  setOpenIds,
  childIsAParent,
}: // selectParentCategory,
// outerParent,
IRow) => {
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
    <div
      key={`section-${item.id}`}
      className="bg-white rounded-md"
      style={{
        marginTop: `${level == 1 ? 15 : 5}px`,
        padding: `${level == 1 && shouldExpand() ? 15 : 0}px`,
      }}
    >
      <div
        className={`mb- rounded p-[5px] cursor-pointer  border ${
          activeId == item.id ? 'bg-blue-500 text-white' : ''
        }`}
        // we are setting the condition for next click
        onClick={() => {
          // selectParentCategory(item.id);
          toggleActive(item.id);
        }}
      >
        {/* avatar  */}

        <div>
          <div className={`flex items-center gap-2 `}>
            {childIsAParent ? (
              <div
                className="grid place-items-center p-[5px] rounded-sm  bg-[#D8D8D8]"
                onClick={(e) => {
                  e.stopPropagation();
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
                }}
              >
                <span>
                  {shouldExpand() ? (
                    <FaMinus size={10} />
                  ) : (
                    <FaPlus size={10} />
                  )}
                </span>
              </div>
            ) : null}
            <p
              className={`text-[13px] ${
                item.id == activeId ? 'font-bold' : null
              }`}
            >
              {item.name}
            </p>
          </div>
        </div>
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
