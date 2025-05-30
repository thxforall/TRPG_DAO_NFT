'use client';

import TabComponent from './TabComponent';
import ItemComponent from './ItemComponent';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Item } from '@/store/types';
import { useEffect, useState } from 'react';
import ItemModal from './ItemModal';
import { equipItem, disarmItem } from '@/store/characterSlice';
import { useDispatch } from 'react-redux';
import EquipedItem from './EquipedItem';

const EquipmentComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const myNFTs = useSelector((state: RootState) => state.character);
  const [weapons, setWeapons] = useState<Item[]>([]);
  const [armors, setArmors] = useState<Item[]>([]);
  const [accessories, setAccessories] = useState<Item[]>([]);
  const [titles, setTitles] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [equippedItem, setEquippedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (selectedItem) {
      switch (selectedItem.type) {
        case 1:
          setEquippedItem(myNFTs.equipment.weapon);
          break;
        case 2:
          setEquippedItem(myNFTs.equipment.armor);
          break;
        case 3:
          setEquippedItem(myNFTs.equipment.accessory);
          break;
        case 4:
          setEquippedItem(myNFTs.equipment.title);
          break;
      }
    }
  }, [selectedItem]);

  useEffect(() => {
    setWeapons(myNFTs.inventory.filter((i) => i.type === 1));
    setArmors(myNFTs.inventory.filter((i) => i.type === 2));
    setAccessories(myNFTs.inventory.filter((i) => i.type === 3));
    setTitles(myNFTs.inventory.filter((i) => i.type === 4));
  }, [myNFTs]);

  return (
    <div>
      <div className="flex flex-col justify-start">
        {/* 장비중 아이템 */}
        <p className="m-1 text-gray-600">장비중 아이템</p>
        <div className="flex flex-wrap justify-between mb-4">
          <EquipedItem
            image={myNFTs.equipment.weapon?.image}
            rarity={myNFTs.equipment.weapon?.rarity}
            defaultImage="/inventory/slot1.png"
            removeEvent={() => dispatch(disarmItem(1))}
          />
          <EquipedItem
            image={myNFTs.equipment.armor?.image}
            rarity={myNFTs.equipment.armor?.rarity}
            defaultImage="/inventory/slot2.png"
            removeEvent={() => dispatch(disarmItem(2))}
          />
          <EquipedItem
            image={myNFTs.equipment.accessory?.image}
            rarity={myNFTs.equipment.accessory?.rarity}
            defaultImage="/inventory/slot3.png"
            removeEvent={() => dispatch(disarmItem(3))}
          />
          <EquipedItem
            image={myNFTs.equipment.title?.image}
            rarity={myNFTs.equipment.title?.rarity}
            defaultImage="/inventory/slot4.png"
            removeEvent={() => dispatch(disarmItem(4))}
          />
        </div>

        {/* 능력치 */}
        <div className="aspect-[16/4] bg-[url('/stat.png')] bg-cover bg-center px-2 py-4 flex flex-col justify-center items-center mb-4">
          <div className="grid grid-cols-2 gap-4 p-1 rounded shadow-inner w-full">
            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img
                src="/stat-icons/attack.png"
                alt="공격력"
                className="w-5 h-5"
              />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.attack}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img
                src="/stat-icons/magic.png"
                alt="마법력"
                className="w-5 h-5"
              />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.magic}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-1 rounded shadow-inner w-full">
            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img src="/stat-icons/str.png" alt="STR" className="w-5 h-5" />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.strength}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img src="/stat-icons/agi.png" alt="AGI" className="w-5 h-5" />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.agility}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img src="/stat-icons/int.png" alt="INT" className="w-5 h-5" />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.intelligence}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img src="/stat-icons/chr.png" alt="CHR" className="w-5 h-5" />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.charisma}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img
                src="/stat-icons/health.png"
                alt="HEALTH"
                className="w-5 h-5"
              />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.health}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-gray-600 rounded p-1 justify-center">
              <img src="/stat-icons/wis.png" alt="WIS" className="w-5 h-5" />
              <span className="text-sm text-white font-medium">
                +{myNFTs.stats.wisdom}
              </span>
            </div>
          </div>
        </div>

        {/* 내 아이템 및 NFT */}
        <TabComponent
          tabs={['무기', '방어구', '악세사리', '칭호']}
          contents={[
            <div key="1">
              <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2 flex justify-center">
                {weapons.length > 0 ? (
                  <div className="grid grid-cols-5 w-full justify-items-center gap-y-4 p-4">
                    {Object.values(weapons).map((item, index) => (
                      <ItemComponent
                        item={item}
                        key={index}
                        clickEvent={(item) => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-white align-middle p-4">
                    보유중인 아이템이 없습니다
                  </p>
                )}
              </div>
            </div>,
            <div key="2">
              <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2 flex justify-center">
                {armors.length > 0 ? (
                  <div className="grid grid-cols-5 w-full justify-items-center gap-y-4 p-4">
                    {Object.values(armors).map((item, index) => (
                      <ItemComponent
                        item={item}
                        key={index}
                        clickEvent={(item) => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-white align-middle p-4">
                    보유중인 아이템이 없습니다
                  </p>
                )}
              </div>
            </div>,
            <div key="3">
              <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2 flex justify-center">
                {accessories.length > 0 ? (
                  <div className="grid grid-cols-5 w-full justify-items-center gap-y-4 p-4">
                    {Object.values(accessories).map((item, index) => (
                      <ItemComponent
                        item={item}
                        key={index}
                        clickEvent={(item) => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-white align-middle p-4">
                    보유중인 아이템이 없습니다
                  </p>
                )}
              </div>
            </div>,
            <div key="4">
              <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2 flex justify-center">
                {titles.length > 0 ? (
                  <div className="grid grid-cols-5 w-full justify-items-center gap-y-4 p-4">
                    {Object.values(titles).map((item, index) => (
                      <ItemComponent
                        item={item}
                        key={index}
                        clickEvent={(item) => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-white align-middle p-4">
                    보유중인 아이템이 없습니다
                  </p>
                )}
              </div>
            </div>,
          ]}
        />
      </div>
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          equippedItem={equippedItem}
          onClose={() => setSelectedItem(null)}
          onEquip={(v) => {
            dispatch(equipItem(v));
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default EquipmentComponent;
